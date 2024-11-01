let students = JSON.parse(localStorage.getItem('students')) || [];

function renderStudents(filteredStudents = students) {
  const studentList = document.getElementById('studentList');
  studentList.innerHTML = '';

  filteredStudents.forEach((student, index) => {
    const studentItem = document.createElement('li');
    studentItem.className = 'student-item';

    const studentInfo = document.createElement('div');
    studentInfo.className = 'student-info';
    studentInfo.innerHTML = `<strong>ID:</strong> ${student.id} &nbsp; | &nbsp; <strong>Name:</strong> ${student.name} &nbsp; | &nbsp; <strong>Room:</strong> ${student.room}`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteStudent(index);

    studentItem.appendChild(studentInfo);
    studentItem.appendChild(deleteButton);
    studentList.appendChild(studentItem);
  });
}

function addStudent() {
  const id = document.getElementById('studentId').value.trim();
  const name = document.getElementById('studentName').value.trim();
  const room = document.getElementById('roomNumber').value.trim();

  if (!id || !name || !room) {
    alert('Please fill out all fields');
    return;
  }

  const student = { id, name, room };
  students.push(student);

  // Save updated students list to local storage
  localStorage.setItem('students', JSON.stringify(students));

  document.getElementById('studentId').value = '';
  document.getElementById('studentName').value = '';
  document.getElementById('roomNumber').value = '';

  renderStudents();
}

function deleteStudent(index) {
  students.splice(index, 1);

  // Update local storage after deletion
  localStorage.setItem('students', JSON.stringify(students));

  renderStudents();
}

function searchStudent() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredStudents = students.filter(student => 
    student.id.toLowerCase().includes(query) ||
    student.name.toLowerCase().includes(query) ||
    student.room.toLowerCase().includes(query)
  );
  renderStudents(filteredStudents);
}

// Load the students from local storage on page load
document.addEventListener('DOMContentLoaded', renderStudents);
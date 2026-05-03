// this array acts as our server storage
var tasks = []







function addTask() {
  var input = document.getElementById("taskInput")
  var taskText = input.value

  if (taskText == "") {
    alert("Please enter a task")
    return
  }

  // AJAX style - save to array without page refresh
  tasks.push(taskText)
  input.value = ""
  displayTasks()
}












function deleteTask(index) {
  // remove task from array
  tasks.splice(index, 1)
  displayTasks()
}












function editTask(index) {
  var newTask = prompt("Edit task:", tasks[index])
  if (newTask != null && newTask != "") {
    // update task in array
    tasks[index] = newTask
    displayTasks()
  }
}













function displayTasks() {
  var list = document.getElementById("taskList")
  list.innerHTML = ""

  for (var i = 0; i < tasks.length; i++) {
    list.innerHTML += "<li>" + tasks[i] +
      "<button class='edit' onclick='editTask(" + i + ")'>Edit</button>" +
      "<button class='delete' onclick='deleteTask(" + i + ")'>Delete</button>" +
      "</li>"
  }
}
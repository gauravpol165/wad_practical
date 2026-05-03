var tasks=[]



function editTask(index){
    var newtask=prompt("Edit task: ",tasks[index])
    if(newtask!=null && newtask!=""){
        tasks[index]=newtask
    }
    displayTasks()
}


function deleteTask(index){
    tasks.splice(index,1)
    displayTasks()
}


function add(){
    var input=document.getElementById("inputtask");
    var inputtext=input.value
    if(inputtext==""){
        alert("Enter task neatly.")
        return
    }
    tasks.push(inputtext)
    input.value=""
    displayTasks()
}





function displayTasks(){
    var list=document.getElementById("tasklist")
    list.innerHTML= ""
    for(var i=0;i<tasks.length;i++){
        list.innerHTML+= "<li>"+ tasks[i] +
        "<button class='edit' onclick='editTask("+ i +")'>  Edit </button>"+
        "<button class='delete' onclick='deleteTask("+ i + ")'>  Delete</button>"+
        "</li>"
    }
}






















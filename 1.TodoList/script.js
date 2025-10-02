
const list=document.getElementById('todo-list');
const newtask=document.getElementById('new-task');
const addtask=document.getElementById('add-task');

console.log(list, newtask, addtask);

let alltasks=JSON.parse(localStorage.getItem("tasks")) || [];

displaytask();
//save to the task to localstorage
addtask.addEventListener("click",function(){
    let tasktext=newtask.value.trim();
    if (tasktext === "") return;
    const task={text:tasktext,index:Date.now()};
    alltasks.push(task);
    savealltasks();
    displaytask();
    newtask.value="";
})
//display all tasks as li
function displaytask(){
    list.innerHTML="";
    alltasks.forEach(function(task,index){
        const li=document.createElement('li');
        li.textContent=task.text;

        let dltbtn=document.createElement('button');
        dltbtn.textContent="❌";
        dltbtn.style.marginLeft="15px";
        dltbtn.style.border="none";
        dltbtn.style.borderRadius="0.2rem";
        dltbtn.style.backgroundColor="#c7f791ff"
        dltbtn.addEventListener("click",function(){
            DeleteTask(index);
        })
        li.appendChild(dltbtn);
        list.appendChild(li);
    });
}
//delete tasks
function DeleteTask(index){
    alltasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(alltasks));
    displaytask();
}
//save tasks
function savealltasks(){
    localStorage.setItem("tasks",JSON.stringify(alltasks));
}


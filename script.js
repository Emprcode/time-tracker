// get data on form submit.
// store that data in global array
// create a display function to display all the data form array to our entry list,

let taskList = []

const badList = []

const hourPerWeek = 24 * 7;

const handleOnSubmit = (e) =>{
    const frmData = new FormData(e);
    const task = frmData.get("task");
    const hr = +frmData.get("hr");
    
const obj = {task, hr};

const totalAllocatedHours = totalTaskHours();

if(totalAllocatedHours + hr > hourPerWeek){
    return alert("Sorry, you exceeds the weekly time");
};

taskList.push(obj);
console.log(taskList);

    displayTasks();
    totalTaskHours();
};

const displayTasks = () => {
   let str = "";

  taskList.map((item, i) => {
    console.log(item, i);
    str += `<tr>
    <th scope="row">1</th>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
        <button onclick = "deleteTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> </button>
        <button class="btn btn-success"><i class="fa-solid fa-right-long"></i> </button>
    </td>
  </tr>`;

  });

document.getElementById('task-list').innerHTML= str;
}

const totalTaskHours = () => {
    const total = taskList.reduce((subTtl, item) => {
        return subTtl + item.hr;
    }, 0);
console.log(total);

document.getElementById('totalHours').innerText = total;

return total;
};

const deleteTask = (i) => {
    if(!window.confirm("Are you sure you want to delete this task?")){
        return;
    }
    taskList = taskList.filter((item, index)=> index !== i);
            
    

    displayTasks();
    totalTaskHours();
;}
// get data on form submit.
// store that data in global array
// create a display function to display all the data form array to our entry list,

let taskList = []

let badList = []

const hourPerWeek = 24 * 7;

const handleOnSubmit = (e) =>{
    const frmData = new FormData(e);
    const task = frmData.get("task");
    const hr = +frmData.get("hr");
    
const obj = {task, hr};

const totalAllocatedHours = totalTaskHours() + totalBadTaskHours();

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
    <th scope="row">${i+1}</th>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
        <button onclick = "deleteTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> </button>
        <button onclick = " markAsNotToDo(${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i> </button>
    </td>
  </tr>`;
  });

document.getElementById('task-list').innerHTML= str;
}


const displayBadTask= ()=>{
    let str = ""
    badList.map((item, i) => {
        str += `<tr>
        <th scope="row">${i + 1}</th>
        <td> ${item.task}</td>
        <td> ${item.hr}</td>
        <td class="text-end">
            <button onclick = "markAsToDo(${i})" class="btn btn-warning"><i class="fa-solid fa-left-long"></i> </button>
            <button onclick = "deleteBadTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> </button>
         

        </td>
      </tr>`
    });

    document.getElementById('bad-task').innerHTML = str;

    totalBadTaskHours();
};





const totalTaskHours = () => {
    const total = taskList.reduce((subTtl, item) => {
        return subTtl + item.hr;
    }, 0);
console.log(total);

document.getElementById('totalHours').innerText = total + totalBadTaskHours() ;

return total;
};

const totalBadTaskHours = () => {
    const total = badList.reduce((subTtl, item) => {
        return subTtl + item.hr;
    }, 0);
console.log(total);

document.getElementById('totalBadHr').innerText = total;

return total;
};

const deleteTask = (i) => {
    if(!window.confirm("Are you sure you want to delete this task?")){
        return;
    }
    taskList = taskList.filter((item, index)=> index !== i);
            

    displayTasks();
    totalTaskHours();
};

const deleteBadTask = (i) => {
    if(!window.confirm("Are you sure you want to delete this task?")){
        return;
    }
    badList = badList.filter((item, index)=> index !== i);
            

    displayBadTask();
    totalTaskHours();
    
};

const markAsNotToDo = (i) => {
    const itm = taskList.splice(i, 1);
    badList.push(itm[0]);
    
    displayTasks();
    displayBadTask();
    
};
const markAsToDo = (i) => {
    const a = badList.splice(i, 1);
    taskList.push(a[0]);
    
    displayTasks();
    displayBadTask();
    
};
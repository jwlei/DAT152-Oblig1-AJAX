import "./taskList.js"
import "./taskBox.js"

const mainURL = "../TaskServices/api/services";
const tasklist = document.querySelector('task-list');
const taskbox = document.querySelector('task-box');
const tasks = await getAllTasks(); //receive task and status from server
const allStatuses = await getAllStatuses(); //get statuses from database/json and send to taskbox and tasklist 
taskbox.allStatuses = allStatuses;
tasklist.allStatuses = allStatuses;

//displays task
tasklist.showTasks(tasks);


tasklist.addTaskCallback(() => {
	taskbox.newtaskCallback( async (task) => {
        if(task.title === "") {
            console.log("input title");
            return;
        }
   	 	console.log(`New Task: ${task.title}.`);
        const resp = await addTask(task.title, task.status);
        const newTask = JSON.parse(resp).task;
        tasklist.showTask(newTask);
    })
});

tasklist.changestatusCallback( async(task) => {
	
    if(!window.confirm(`This will edit status of ${task.title} to ${task.status}!`)) return;

    console.log(`!New status!: ${task.status}.`);
    const resp = await editTaskStatus(task.id, task.status);
    tasklist.updateTask(JSON.parse(resp));
});

tasklist.removeTaskCallback( async (task) => {
    if(!window.confirm(`Are you sure you want to delete task "${task.title}"?`)) return;
    console.log(`!task deleted!${task.id}`);
    const resp = await deleteMember(task.id);
    const taskDl = JSON.parse(resp);
    tasklist.removeTask(taskDl.id);
})


async function getAllTasks() {
    
    const url = `${mainURL}/tasklist`;
        const resp = await fetch(url, {method: "get"});
     	console.log(resp);
        const json = await resp.json();
       


        return json.tasks;
}

async function getAllStatuses() {

		const url = `${mainURL}/allstatuses`;
		
        const resp = await fetch(url, {method: "get"});
		  console.log(resp);
        const json = await resp.json();
	
        return json.allstatuses;
}

async function editTaskStatus(id, status) {

    	const url = `${mainURL}/task/${id}`;

        const data = {
			"status": `${status}`};

        const request = {
            "method": "PUT",
            "headers": { "Content-Type":"application/json; charset=utf-8"},
            "body": JSON.stringify(data),
            "cache": "no-cache",
            "redirect": "error"
        };

        const resp = await fetch(url, request);
        const object = await resp.json();

        console.log(`API: Server resp: ${JSON.stringify(object)}`);

        return JSON.stringify(object);
    
}

async function addTask(title, status) {
	try {
    const url = `${mainURL}/task`;

    const data = {
        "title": `${title}`,
        "status": `${status}`
    };

    const request = {
        "method": "POST",
        "headers": { "Content-Type":"application/json; charset=utf-8"},
        "body": JSON.stringify(data),
        "cache": "no-cache",
        "redirect": "error"
    };

    const resp = await fetch(url, request);
    const object = await resp.json();

    console.log("Object added to database: ", JSON.stringify(object));
    return JSON.stringify(object);

	} catch {
		console.log("Error when adding to database");
	}
}
async function deleteMember(id) {
    const url = `${mainURL}/task/${id}`;

        const resp = await fetch(url, {method: "delete"});
        const object = await resp.json();

        console.log("Deleted object from database: ", JSON.stringify(object));
        return JSON.stringify(object);
   
}
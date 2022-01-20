class TaskList extends HTMLElement {
    allStatuses = [];

    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = HtmlAddButton();
    }

    enableAddTask = () => {
        this.shadowRoot.querySelector('.newTask').disabled = false;
    }

    showTasks = (tasks) => {
        this.enableAddTask();
        this.shadowRoot.innerHTML += HtmlTaskList(tasks, this.allStatuses);
    }

    addTaskCallback = (fn) => {
        const addBtn = this.shadowRoot.querySelector('.newTask');
        addBtn.addEventListener('click', fn);
    }

    changestatusCallback = (fn) => {
        const rootTaskElement = this.shadowRoot.querySelector('.tasks');
        rootTaskElement.addEventListener('change', function(e) {
            const elem = e.target;

            if (elem && elem.matches('.changestatus')) {
                const task = {
                    id: elem.id,
                    status: elem.options[elem.selectedIndex].text,
                    title: elem.title
                };
                elem.value = "none";
                fn(task);
            }
        });
    }

    removeTaskCallback = (fn) => {
        const rootTaskElement = this.shadowRoot.querySelector('.tasks');
        rootTaskElement.addEventListener('click', function(e) {
            const btn = e.target;

            if (btn && btn.matches('.removeButton')) {
                const task = {
                    id: btn.id,
                    title: btn.title
                }
                fn(task);
            }
        });
    }

    showTask = (task) => {
        const list = this.shadowRoot.querySelector('.tasks');
        list.innerHTML += HtmlTask(task, this.allStatuses);
    }

    updateTask = (data) => {
        const elem = this.shadowRoot.getElementById(`${data.id}`);
        elem.querySelector('.taskstatus').innerHTML = `${data.status}`;
    }

    removeTask = (id) => {
        this.shadowRoot.getElementById(id).remove();
    }

    noTask = (task) => {
	console.log("No task");
	}
}

const HtmlAddButton = () => {
    return `
    <div class="information">
    	<button type="button" class='newTask' disabled>Add new task</button>
    	</div>
    <br>
    `;
};

const HtmlTaskList = (tasks, statuses) => {
    return `
    <div class="tasklist">
    <table class="tasks">
        <tr>
            <th>Task</th>
            <th>Status</th>
            <th></th>
            <th></th>
        </tr>
        ${tasks.map(task => HtmlTask(task, statuses)).join('')}
    </table>
    </div>
    `;
};

const HtmlTask = (task, statuses) => {
    return `
    <tr class="task" id="${task.id}">
        <td>${task.title}</td>
        <td class="taskstatus">${task.status}</td>
        <td>
            <select class="changestatus" id="${task.id}" title="${task.title}">
                <option value="none" selected disabled hidden>Modify</option>
                ${statuses.map(status => `<option value="${status}">${status}</option>`)}                
            </select>
        </td>
        <td><button type="button" class="removeButton" id="${task.id}" title="${task.title}">Delete task</button></td>
    </tr>
    `;
};

window.customElements.define("task-list", TaskList);
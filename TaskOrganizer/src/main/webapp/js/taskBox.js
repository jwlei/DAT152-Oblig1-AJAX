class TaskBox extends HTMLElement {
    allStatuses = [];

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
    }

    show = () => {
        this.shadowRoot.innerHTML = buildModalboxHtml(this.allStatuses);

        const modalbox = this.shadowRoot.querySelector('.modalbox');
 		//createModalStyle(modalbox.style);
 		modalbox.querySelector('.exitmodal').addEventListener('click', this.close);

       const modaloverlay = this.shadowRoot.querySelector('.modaloverlay');
	   createOverlayStyle(modaloverlay.style);
       modaloverlay.addEventListener('click', this.close);

    }

    close = ()=> {
        this.shadowRoot.querySelector('.modalbox').remove();
        this.shadowRoot.querySelector('.modaloverlay').remove();

    }

    newtaskCallback = (fn) => {
        this.show();

        const addBtn = this.shadowRoot.querySelector('.addNewTask');
        addBtn.addEventListener('click', ()=> {
            const title = this.shadowRoot.querySelector('.title').value;
            if (title === "") {
                this.shadowRoot.querySelector('.error').textContent = "Title cannot be empty";
                return;
            }
            const status = this.shadowRoot.querySelector('.status').value;

            const task = {
                title: title,
                status: status
            }
            this.close();
            fn(task);
        });
    }

}

const buildModalboxHtml = (statuses) => {
    return `
		<div class="modalbox">
			<button class="exitmodal" style="float:right">&times;</button>
				<p>
					Title: <input type="text" class="title">
					<span class="error" style="color: red"></span>
				</p>
				<p>
				Status: <select name="selectstatus" class="status">
					${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
					</select>
				</p>
				<button type="button" class="addNewTask">Add task</button>
		</div>
		<div class="modaloverlay"></div>
		`;
};

const createModalstyle = (cms) => {
    cms.position= "relative";
    cms.fontFamily= "Arial, Helvetica, sans.serif";
    cms.backgroundColor= "seashell";
    cms.with= "50%";
    cms.height= "30%";
    cms.display= "flex";
    cms.justifyContent= "space-around";
    cms.alignItems= "center";
    cms.flexDirection= "column";};



const createOverlayStyle = (cos) => {
    cos.position= "fixed";
    cos.width = "100%";
    cos.height = "100vh";
    cos.top= "0";
    cos.left= "0";
    cos.backgroundColor= "rgba(0, 0, 0, 0.5)";
    cos.display= "flex";
    cos.justifyContent= "center";
    cos.alignItems= "center";
    cos.visibility= "hidden";
    cos.opacity= "0";
    cos.transition= "visibility 0s, opacity 0.5s";}


window.customElements.define("task-box", TaskBox);
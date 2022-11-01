// create Html template
const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="./style.css"/>
     <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
     <div class="task-wrapper">
            <div class="header">
                <span>
                    <i class="fa fa-arrow-left"></i>
                </span>
                <h5 id="header">Tasks</h5>
            </div>
            <ul class="body">
                
            </ul>
        </div>

`;

class TaskList extends HTMLElement {
    constructor() {
        super();
        // Open the shadow DOM so it can be modified
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // fetch data
    async fethData() {
        const res = await fetch('http://localhost:3001/projects/1');
        let tasks = res.json();
        return tasks;
    }

    async connectedCallback() {
        // Connected callback is a hook that will run whenever the element is fetched on the DOM

        let taskWrapper = this.shadowRoot.querySelector('.body');
        const tasks = await this.fethData();
        tasks.tasks.forEach((task) => {
            taskWrapper.innerHTML += `
            <task-card
                    id="${task.id}"
                    title="${task.title}"
                    checked="${task.checked}"
                    description="${task.description}"
                >
                </task-card>
            `;
        });
    }
}

export default TaskList;

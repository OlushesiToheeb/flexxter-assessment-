// create Html template
const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="./style.css"/>
     <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
    <li class="task">
        <div class="check" id='check'>
            <i class="fa fa-check check-icon"></i>
        </div>
        <div class="task-details">
            <p class="title"></p>
            <span id="description">
            </span>
        </div>
        <i class="fa fa-angle-right next"></i>      
    </li>
`;

class Task extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener('click', this._onClick.bind(this));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // This STATIC getter is what will manage what properties the browser must be aware of changing
    static get observedAttributes() {
        return ['title', 'description', 'checked'];
    }

    _onClick(e) {
        // checked attribute is a string by default, so a condition was added to turn it to boolean
        let checked = this.getAttribute('checked') !== 'false';
        this.setAttribute('checked', Boolean(!checked));

        //call the imaginary endpoint to save the new task
        fetch('https://flexxter.de/Tasks/Save', {
            method: 'POST',

            body: JSON.stringify({
                project_id: '1',
                task_id: 1,
                checked: checked,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((res) => res && { status: 'success' })
            .catch((err) => err && { status: 'error' });
    }

    // This hook will handle the change of the properties of the element
    attributeChangedCallback() {
        // checked attribute is a string by default, so a condition was added to turn it to boolean
        let checked = this.getAttribute('checked') !== 'false';
        let check = this.shadowRoot.querySelector('#check');
        let checkIcon = this.shadowRoot.querySelector('.check-icon');

        this.shadowRoot.querySelector('.title').innerHTML =
            this.getAttribute('title');
        this.shadowRoot.querySelector('#description').innerHTML =
            this.getAttribute('description');

        // show check icon only if checked attribute is true
        if (!checked) {
            check.classList.replace('check', 'check2');
            checkIcon.style.display = 'none';
        } else {
            check.classList.replace('check2', 'check');
            checkIcon.style.display = 'block';
        }
    }
}

export default Task;

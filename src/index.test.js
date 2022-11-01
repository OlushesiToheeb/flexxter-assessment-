import TaskList from './Task-list/index.js';

// Define Tasklist
window.customElements.define('task-list', TaskList);

// Create instance of Tasklist
let taskList = new TaskList();

// Append to body (to run connectedCallback)
document.body.appendChild(taskList);

/**
 *  Tests
 *
 */

describe('Test Task list', () => {
    test('Test tag name', () => {
        expect(taskList.tagName).toBe('TASK-LIST');
    });
});

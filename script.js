// Firebase配置
// 请替换为您自己的Firebase项目配置
// 如何获取Firebase配置：https://firebase.google.com/docs/web/setup#create-project
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
};

// 初始化Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const tasksRef = database.ref('tasks');

// DOM元素
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

// 任务管理
let tasks = [];

// 加载任务
function loadTasks() {
    tasksRef.on('value', (snapshot) => {
        tasks = [];
        snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
            task.id = childSnapshot.key;
            tasks.push(task);
        });
        renderTasks();
    });
}

// 渲染任务
function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.textContent = task.text;
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        if (!task.completed) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.textContent = '完成';
            completeBtn.addEventListener('click', () => completeTask(task.id));
            taskActions.appendChild(completeBtn);
        } else {
            const restoreBtn = document.createElement('button');
            restoreBtn.className = 'restore-btn';
            restoreBtn.textContent = '恢复';
            restoreBtn.addEventListener('click', () => restoreTask(task.id));
            taskActions.appendChild(restoreBtn);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        taskActions.appendChild(deleteBtn);
        
        li.appendChild(taskContent);
        li.appendChild(taskActions);
        
        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

// 添加任务
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const newTask = {
            text: text,
            completed: false,
            createdAt: Date.now()
        };
        
        tasksRef.push(newTask);
        taskInput.value = '';
    }
}

// 完成任务
function completeTask(id) {
    const taskRef = tasksRef.child(id);
    taskRef.update({ completed: true });
    
    // 触发烟花效果
    launchFireworks();
}

// 恢复任务
function restoreTask(id) {
    const taskRef = tasksRef.child(id);
    taskRef.update({ completed: false });
}

// 删除任务
function deleteTask(id) {
    const taskRef = tasksRef.child(id);
    taskRef.remove();
}

// 事件监听
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 初始化
window.addEventListener('load', () => {
    loadTasks();
});
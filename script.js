// Supabase配置
// 请替换为您自己的Supabase项目配置
// 如何获取Supabase配置：https://supabase.com/docs/guides/getting-started/tutorials/with-javascript#1-create-a-project
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// 初始化Supabase
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM元素
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

// 任务管理
let tasks = [];

// 初始化数据库表
async function initDatabase() {
    // 创建tasks表
    const { error } = await supabase
        .from('tasks')
        .select('id')
        .limit(1);
    
    if (error && error.code === '42P01') { // 表不存在
        // 注意：在实际应用中，应该在Supabase控制台创建表
        // 这里只是一个提示，因为JavaScript客户端不能直接创建表
        console.log('请在Supabase控制台创建tasks表，包含id、text、completed、created_at字段');
    }
}

// 加载任务
async function loadTasks() {
    const { data, error } = await supabase
        .from('tasks')
        .select('*');
    
    if (error) {
        console.error('加载任务失败:', error);
        return;
    }
    
    tasks = data;
    renderTasks();
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
async function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const { data, error } = await supabase
            .from('tasks')
            .insert({
                text: text,
                completed: false,
                created_at: new Date().toISOString()
            })
            .select();
        
        if (error) {
            console.error('添加任务失败:', error);
            return;
        }
        
        taskInput.value = '';
        loadTasks(); // 重新加载任务
    }
}

// 完成任务
async function completeTask(id) {
    const { error } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', id);
    
    if (error) {
        console.error('完成任务失败:', error);
        return;
    }
    
    // 触发烟花效果
    launchFireworks();
    loadTasks(); // 重新加载任务
}

// 恢复任务
async function restoreTask(id) {
    const { error } = await supabase
        .from('tasks')
        .update({ completed: false })
        .eq('id', id);
    
    if (error) {
        console.error('恢复任务失败:', error);
        return;
    }
    
    loadTasks(); // 重新加载任务
}

// 删除任务
async function deleteTask(id) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
    
    if (error) {
        console.error('删除任务失败:', error);
        return;
    }
    
    loadTasks(); // 重新加载任务
}

// 事件监听
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 初始化
window.addEventListener('load', async () => {
    await initDatabase();
    await loadTasks();
});
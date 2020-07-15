{
    // loading the various html elements in javascript
    const serverCountField = document.getElementById("server-count");
    const addServerButton = document.getElementById("add-server");
    const removeServerButton = document.getElementById("remove-server");
    const addTaskButton = document.getElementById("add-task");
    const tasks = document.getElementById("tasks");
    const numberOfTasks = document.getElementById("number-of-tasks");

    // 100/20 -> 5 which is the amount by which we need to increment rhe width every second
    const timeToFinishTask = 20;
    const incrementPerSecond = 100 / timeToFinishTask;
    const serversToBeRemoved = document.getElementById("servers-to-be-removed");

    let serverCount = 1;
    let lastRunningTaskIndex = 0;
    let runningTaskCount = 0;
    let taskCount = 0;
    let originalTaskCount = 0;

    // This function is called when we need to remove a task thats not running
    function deleteTask() {
        this.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        taskCount--;
    }

    class Task {
        constructor(task) {
            this.task = task;

            // The updateProgress and manageTask functios handle the loading of the status bar for tasks, Its called every second
            this.updateProgress = (progress) => {
                if (!task) return;
                task.style.width = progress + '%';
                let ellapsedTime = 20 * progress / 100;
                if (ellapsedTime < 10) ellapsedTime = "0" + ellapsedTime;
                task.firstChild.innerText = "00:" + ellapsedTime;
            }

            this.manageTask = (progress, index) => {
                if (progress > 100) {
                    progress = 0;
                    this.updateProgress(progress);
                    runningTaskCount--;
                    task.classList.remove("progress-done")
                    task.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("disabled")
                    serverCountField.innerText = serverCount;
                    serversToBeRemoved.innerText = Math.max(0, Number(serversToBeRemoved.innerText) - 1);
                } else {
                    task.parentElement.parentElement.children[2].style.display = "none";
                    this.updateProgress(progress)
                    progress += incrementPerSecond;
                    setTimeout(this.manageTask, 1000, progress, index);
                }
            }
        }
    }

    // This function keeps on running every 500ms and tracks for changes in the system ( like addition/removal of new servers ) if any.
    function deamon() {
        const numberOfServers = Number(serverCountField.innerText);
        const availableServers = numberOfServers - runningTaskCount;
        const endCount = taskCount - runningTaskCount;
        for (let i = 0; i < Math.min(availableServers, endCount); i++) {
            if (tasks.children[lastRunningTaskIndex]) {
                new Task(tasks.children[lastRunningTaskIndex++].children[0].children[0].children[0].children[1].children[0]).manageTask(0, lastRunningTaskIndex);
                runningTaskCount++;
            }
        }
        if (runningTaskCount == 0) {
            serversToBeRemoved.innerText = 0;
            serverCountField.innerText = serverCount;
        }

        setTimeout(deamon, 1000);
    }

    deamon();

    // addServerButton handles the addition of new servers
    addServerButton.onclick = () => {
            let count = serverCount;
            if (count == 9) addServerButton.classList.add("disabled");
            removeServerButton.classList.remove("disabled");
            serverCount = count + 1;
            serverCountField.innerText = serverCount;
        }
        // removeServerButton handles the removal of new servers
    removeServerButton.onclick = () => {
            if (serverCount == 2) removeServerButton.classList.add("disabled");
            addServerButton.classList.remove("disabled");
            serverCount = serverCount - 1;
            serversToBeRemoved.innerText = Number(serverCountField.innerText) - serverCount;
        }
        // This function adds the new tasks to the pool
    addTaskButton.onclick = () => {
        const countNewTasks = Number(numberOfTasks.value);
        for (let i = 0; i < countNewTasks; i++)
            tasks.appendChild(createTaskStatusBar(originalTaskCount + i));
        taskCount += countNewTasks;
        originalTaskCount += countNewTasks;
    }

}
// This is a utility funtion that creates the Structure for a new task

/*
Here is the structure obtained at the end

<div class="row ">
            <div class="col s12 ">
                <div class="card purple darken-4">
                    <div class="card-content white-text ">
                        <span class="card-title ">Task #1</span>
                        <div class="progress"><div class="progress-done"></div></div>
                    </div>
                    <div class = "card-action">
                        <button></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
*/

function createTaskStatusBar(i) {

    const row = document.createElement("div")
    row.classList.add("row")

    const col = document.createElement("div");
    col.classList.add("col", "s12");

    const child2 = document.createElement("div");
    child2.classList.add("card", "blue-grey", "darken-4");

    const outerDiv = document.createElement("div");
    outerDiv.classList.add("progress");

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("progress-done");

    const innerText = document.createElement("span");
    innerText.classList.add("text");
    innerText.innerText = "Waiting....";

    const deleteButton = document.createElement("a");
    deleteButton.onclick = deleteTask;
    deleteButton.href = "#"
    deleteButton.classList.add("waves-effect", "waves-teal", "white-text", "purple", "darken-4", "btn-flat")
    deleteButton.innerText = " Delete Task ";

    const taskId = document.createElement("span")
    taskId.classList.add("card-title");
    taskId.innerText = " Task # " + (1 + i);

    innerDiv.appendChild(innerText);
    outerDiv.appendChild(innerDiv);

    const child21 = document.createElement("div");
    child21.classList.add("card-content", "white-text");
    child21.append(taskId);

    child2.append(child21);
    col.append(child2);
    row.appendChild(col);

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("card-action")
    actionDiv.appendChild(deleteButton)

    child21.appendChild(outerDiv)
    actionDiv.appendChild(deleteButton);
    child21.append(actionDiv);

    innerDiv.style.opacity = "1";
    innerDiv.style.width = "0%";

    console.log(row)

    return row
}
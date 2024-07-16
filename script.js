// Getting all required elements 
const inputField = document.querySelector('.input-field textarea') // querySelector() returns the first html element that matches a CSS selector
const todolists = document.querySelector('.todolists')
const pendinNum = document.querySelector('.pending-num')
const clearButton = document.querySelector('.clear-button')

// THe below is responsible for displaying how many pending tasks there are
function allTasks(){
    let tasks = document.querySelectorAll(".pending") // This returns a nodelist of all the elements that are part of the pending class
    // one html element can have more than one class, e.g. below there is class="list pending", these are two classes, "list" and "pending" 
    // So with the query selector ".pending" this will return the li element below with class "list pending"
    pendinNum.textContent = tasks.length === 0 ? "no" : tasks.length // If there are more than 0 tasks, change the pendinNum to account for the number of tasks, else return "no"

    let allLists = document.querySelectorAll(".list")
    if (allLists.length > 0) {
        todolists.style.marginTop = "20px"
        clearButton.style.pointerEvents = "auto" // This segment just changes the style depending on whether there are entries on 
        return
    }
    todolists.style.marginTop = "0px"
    clearButton.style.pointerEvents = "none"
}


// Add task while we put value in text area and press enter
inputField.addEventListener('keyup', e => { // This e returns the event that triggered the function
    let inputVal = inputField.value.trim(); // value property returns the current value from an input form, trim removes extra whitespaces

    // If enter button is clicked and input value length is greater than 0
    if (e.key === "Enter" && inputVal.length > 0){
        let liTag = `<li class="list pending" onclick="handleStatus(this)">
                        <input type="checkbox">
                        <span class="task">${inputVal}</span>
                        <i class='bx bx-trash-alt' onclick="deleteTask(this)"></i>
                    </li>`; // The liTag variable holds the html code that creates the list entry 
            // the ${} allows you to place a variable in a string
            // Have to use `` instead of ""

        todolists.insertAdjacentHTML("beforeend", liTag); // inserting li tag inside the todolist div, "beforeend" defines where the li tag gets placed
        inputField.value = ""; // Once there has been an input, then reset the text area 
        allTasks()
    }
})

//checking and unchecking the checkbox while we click on the task
// the li tag above has an onclick attribute, everytime that list item is clicked it will run the handleStatus function
function handleStatus(e){ // the single parameter we've defined in the function returns the li tag, the e returns the li element in this case 
    const checkbox = e.querySelector("input"); // getting the checkbox 
    if (checkbox.checked === true){ // If the checkbox is checked, then uncheck the box
        checkbox.checked = false
    } else{ // else if the checkbox is unchecked, then check the box
        checkbox.checked = true
    }
    e.classList.toggle("pending") // e.classList returns the class name in the li element, the toggle method adds and removes the string specified,
    // So currently the li element has a class name "list", but when we click the li element that class name changes to "list pending", clicking again returns it to "list"
    allTasks()
}

//deleting task while we click on the delete icon
function deleteTask(e){
    e.parentElement.remove();
    allTasks()
}

//deleting all the tasks while we click on the clear button 
clearButton.addEventListener("click", function(){ // click clear all, this changes all the html code in the todolists class to an empty string
    todolists.innerHTML = "" 
    allTasks()
})




// 參考自https://ithelp.ithome.com.tw/articles/10281200
// 依作者的寫法先模仿

const apiUrl = `https://fathomless-brushlands-42339.herokuapp.com/todo2`;
const inputText = document.querySelector(".inputText");
const addBtn = document.querySelector(".addBtn");
// const list = document.querySelector(".list");
// const check = document.querySelector(".check");
// const count = document.querySelector(".count");
let data = [];



// initiate to-do list

// function init(){
//     let str="";
//     let remain = 0;
//     data.forEach(function(items, index) {
//         str +=`<li class="${item.del}">`
//     });
// }


// add new to-do
addBtn.addEventListener("click", addTodo);
// execute addTodo on click
function addTodo(){
    // compose the items
    let todo = {
        // value of input 
        txt : inputText.value,
        // use getime 
        id : new Date().getTime,
        // record the status of to-do items
        complete : false,
    }
    // idiot-proof make sure if it's not empty
    if (todo.txt.trim() !== ""){

        data.unshift(todo);
        // clear the input space
        inputText.value = "";
    } 

    render(data);
}; 

function render(todo){
    let str = "";

    todo.forEach((item) => {

    str += `<li data-id="${item.id}">
          <label class = "checkbox" for = "">    
            <input type = "checkbox" ${item.complete ? "checked" : ""}/>
            <span>${item.txt}</span>
            </label>
            <a href = "#" class = "delete"></a>
            </li>`;
    });
    // finally put the string finished into todoList
    todoList.innerHTML = str;
}

// delete single item or alter the status
todoList.addEventListener("click", (e) =>{
    // use closest to find the li tag clicked
    // use dataset.id to get id in the li tag
    // transfer the id for string to number
    let id = parseInt(e.target.closest("li").dataset.id);
    // to delete
    // to make sure if it's a tag via nodeName
    if (e.target.nodeName ==="A"){
        e.preventDefault(); 
        // to cancel the defualt action of a tag
        // use finIndex to make sure if the id in data array corresponds to the one clicked  
        let index = data.findIndex((item) => item.id === id);
        // if true , delete the data
        data.splice(index, 1);
    } 
    else{
        // alter the checkbox status
        // use forEach
    data.forEach((item) =>{
        // if the id in data array corresponds to the one clicked 
        if (item.id === id){
            // update the checkbox status
            item.complete ? (item.complest = false) : (item.complete = true);
        }
    });
    }
    // render again
    render(data);
});

// to update the tab status
const tab = document.querySelector("#tab");

let Status = "all";

tab.addEventListener("click", changeTab);
// execute changeTab function on click
function changeTab(e){
    let Status = e.target.dataset.tab;
    // use querySelector to select li tag under tab 
    let tabs = document.querySelector("#tab li");


    // clear all the class pattern on click
    tabs.forEach((item) =>{
    // clear all class active pattern
        item.setAttribute("class", "");
    });
    e.target.setAttribute("class", "active");
    // render again the tab page
    updateList();
}

// 
function updateList(){
    
    let showData = [];

    if (Status === "all"){
        showData = data;
    }
    else if (Status === "work"){
        showData = data.filter((item) => !item.complete);
    }
    else {
        showData = data.filter((item) =>item.complete);
    }

    const workNum = document.querySelector(".numLeft");

    let todoLength = data.filter((item) => !item.complete);

    workNum.textContent = todoLength.length;

    render(showData);
}
updateList();
//refresh the page

// delete items done
//  
const clearDone = document.querySelector("#clearDone");

clearDone.addEventListener("click", function(e){
    // cancel default effects
    e.preventDefault();
    // 
    data = data.filter((item) => !item.complete);
    updateList();
})


















// save.addEventListener("click", function(e){
//     let obj = {finished:"", checked:"false", del:""};
//     if (text.value==""){
//         alert("Please enter to-do")
//     }
// })

// obj.item = text.value;
// data.push(obj);
// axios
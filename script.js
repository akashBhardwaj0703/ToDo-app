function getInput() {
    const inp = document.getElementById("inpText");
    const value = inp.value;
    inp.value = "";
    return value;
}

let btn = document.getElementById("addBtn");


function fillLocal(note) {
    let items = JSON.parse(localStorage.getItem("myItems")) || [];

    for (let e of items) {
        if (e[0] === note) {
            alert("value already exist");
            return 0;
        }
    }

    items.push([note, false]);
    localStorage.setItem("myItems", JSON.stringify(items));
}

function deleteLocal(note) {
    let items = JSON.parse(localStorage.getItem("myItems")) || [];  //covert the stored string back to array :)
    items = items.filter(item => item[0] !== note);
    localStorage.setItem("myItems", JSON.stringify(items));  //store value of item key as string :)
}

function addItem(event) {
    let value = getInput();
    value.trim();

    if (value === "") return;

    let a = fillLocal(value);
    if (a == 0) return;

    //creating a div
    let maindiv = document.createElement("div");
    maindiv.classList = "mainDiv";

    // if(event.target.tagName === "BUTTON")



    let button = document.createElement("button");
    button.classList = "deleteBtn";
    button.innerHTML = "&times;";

    let div = document.createElement("div");
    div.classList = "items";

    let div2 = document.createElement("div");
    div2.textContent = value;
    div.append(div2);

    //inserting a checkbox
    let inp = document.createElement("input");
    inp.id = 'checkbox';
    inp.type = "checkbox";
    div.insertAdjacentElement("afterbegin", inp);

    maindiv.append(div);
    maindiv.append(button);

    let parent = document.querySelector(".btmDiv");
    // console.log("A");
    parent.append(maindiv);
}

// function enter(event){
//     if(event.key === "Enter"){
//         addItem();
//     }
// }
// const inp = document.getElementById("inpText");
// inp.addEventListener("keypress",enter)

btn.addEventListener("click", addItem);

let btmDiv = document.querySelector(".btmDiv");

function remove1(event) {
    // let btn = event.target;
    if (event.target.classList.contains("deleteBtn")) {
        let parent = event.target.parentElement;
        parent.classList.add("cssTran");

        let adjacentE = event.target.previousElementSibling;
        let inp = adjacentE.querySelector("div");

        deleteLocal(inp.textContent);
        setTimeout(() => {
            parent.remove();
        }, 1000)

    }

}



btmDiv.addEventListener("click", remove1);




function removeAll(event) {
    if (event.target.id === "clearBtn") {

        let isConfirmed = confirm("Are you sure to clear list?");

        if (isConfirmed) {
            localStorage.clear();
            let parent1 = event.target.parentElement;
            let delNode = parent1.querySelectorAll(".mainDiv");

            delNode.forEach(element => {
                if (element) {
                    element.classList.add("cssTran");
                    setTimeout(() => {
                        element.remove();
                    }, 700)
                }

            });
        }



    }
}

btmDiv.addEventListener("click", removeAll);


//checkBox Events handels





function saveCheckBoxes(event) {
    // for(int i=0;i<checkBoxes.le)

    if (event.target.type === "checkbox") {
        let adj = event.target.nextElementSibling;

        let txt = adj.textContent;

        let items = JSON.parse(localStorage.getItem("myItems")) || [];

        
        let newItems;

        items.forEach(e =>{
            if(e[0] == txt){
                e[1] = event.target.checked;
            }
        })
        localStorage.setItem("myItems", JSON.stringify(items));
    }

}

btmDiv.addEventListener("change",saveCheckBoxes);



function addThroughLocal() {

    // let z = Object.values(localStorage)
    // console.log(z)
    let values = JSON.parse(localStorage.getItem("myItems"))

    if(values == []) return;
    // console.log(values);

    values.forEach(value => {
        //creating a div
        let maindiv = document.createElement("div");
        maindiv.classList = "mainDiv";

        // if(event.target.tagName === "BUTTON")


        let button = document.createElement("button");
        button.classList = "deleteBtn";
        button.innerHTML = "&times;";

        let div = document.createElement("div");
        div.classList = "items";

        let div2 = document.createElement("div");
        div2.textContent = value[0];
        div.append(div2);

        //inserting a checkbox
        let inp = document.createElement("input");
        inp.id = 'checkbox';
        inp.type = "checkbox";
        inp.checked = value[1];
        div.insertAdjacentElement("afterbegin", inp);

        maindiv.append(div);
        maindiv.append(button);

        let parent = document.querySelector(".btmDiv");
        // console.log("A");
        parent.append(maindiv);
    })
    // console.log(values);
}
addThroughLocal();
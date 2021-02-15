const getData = async () => {
    const url = "https://6029dac76c995100176edb9a.mockapi.io/inventory";
    let response = await fetch(url);
    let result = await response.json()
    console.log(result)
    display(result);
}

let display = (result) => {
    let inventoryId = document.querySelector("#inventory");
    inventoryId.innerHTML = "";
    result.forEach(item => {
        let card = document.createElement("div")
        card.innerHTML = `
        <p>${item.name}</p>`;
        inventoryId.appendChild(card);
        let cardDelete = document.createElement("button")
        let cardDeleteText = document.createTextNode("Delete")
        cardDelete.appendChild(cardDeleteText);
        inventoryId.appendChild(cardDelete)
        cardDelete.setAttribute("onclick", `deleteData("${item.id}")`)
        let cardUpdate = document.createElement("button")
        let cardUpdateText = document.createTextNode("Update")
        cardUpdate.appendChild(cardUpdateText)
        inventoryId.appendChild(cardUpdate)
        cardUpdate.setAttribute("onclick", `updateData("${item.id}")`)
    })
}

getData();

let addInventorySubmit = document.querySelector("#addInventory")



const addData = async (event) => {
    console.log("klik")
    event.preventDefault()
    let dataForm = document.querySelector("#newInventory").value
    console.log(dataForm)
    let dataObj = {
        name: dataForm
    }
    console.log (dataObj)

    let dataJSON = JSON.stringify(dataObj)
    console.log(dataJSON)

    const url = "https://6029dac76c995100176edb9a.mockapi.io/inventory"
    const setting = {
        method: "POST",
        headers: {
            "Content-Type":"application/json", 
        },
        body: dataJSON
    }
    console.log(setting)

    const fetchResponse = await fetch(url, setting)
    const dataResponse = await fetchResponse.json()
    console.log(dataResponse)
    getData()
    document.querySelector("#newInventory").value=""
}

addInventorySubmit.addEventListener("click", addData)


const deleteData = async(id) => {
    const url = "https://6029dac76c995100176edb9a.mockapi.io/inventory/"
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
        }
    }

    const fetchResponse = await fetch(url+id, option)
    const dataResponse = await fetchResponse.json()
    console.log(dataResponse)
    getData()
    document.querySelector("#newInventory").value=""
}

const updateData = async(id) => {
    const url = "https://6029dac76c995100176edb9a.mockapi.io/inventory/";
    let dataUpdate = prompt("Insert new product here : ");
    let dataObj = {
        name : dataUpdate
    }
    let dataJSON = JSON.stringify(dataObj)
    console.log(dataJSON)

    const setting = {
        method: "PUT",
        headers: {
            "Content-Type":"application/json", 
        }, 
        body: dataJSON
    }

    const fetchResponse = await fetch(url+id, setting)
    const dataResponse = await fetchResponse.json()
    console.log(dataResponse)
    getData()
    document.querySelector("#newInventory").value=""
};


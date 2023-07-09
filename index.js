import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {databaseURL: "https://realtalk-app-8b361-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagesInDB = ref(database, "messages")

const buttonEl = document.getElementById("publish-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const messageEl = document.getElementById("message-el")
const messageOutputEl = document.getElementById("message-output")

buttonEl.addEventListener("click", function(){
    let message = messageEl.value
    let fromUser = fromEl.value
    let toUser = toEl.value
    let string = `<b>To:</b> ${toUser} <br><b>From:</b> ${fromUser}</div><br><br>${message}`
    push(messagesInDB, string)
    clearInputFields()
})

onValue(messagesInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        messageEl.innerHTML = ""
        fromEl.innerHTML = ""
        toEl.innerHTML= ""
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendToMessages(currentItem)
        }    
    } else {
        messageOutputEl.innerHTML = "Be the first to start the conversation!"
    }
})

function appendToMessages(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.innerHTML = itemValue
    console.log(itemValue)
    messageOutputEl.append(newEl)
}

function clearInputFields() {
    messageEl.value = ""
    fromEl.value= ""
    toEl.value= ""    
}



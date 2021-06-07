let socket = io( )
$(()=>{
    $("#send").click(()=>{
        // addMessages({name:"John", message:"Hello World!"})
        let message = {
            name:$("#name").val(),
            message:$("#message").val()
        }
        postMessages(message)
    })
    getMessages()
})
socket.on('message',addMessasge)

function addMessages(message){
    $("#messages").append(
        `<div class="bg-info p-3 m-3 col-10 text-light border rounded"><h4>${message.name}</h4> <p>${message.message}</p></div> `
        )
}

function getMessages(){
$.get('https://hsia-chatbot.herokuapp.com/messages',(data)=>{
    data.forEach(addMessages)
    
})
}

function postMessages(message){

    $.post('https://hsia-chatbot.herokuapp.com/messages',message)
    
}



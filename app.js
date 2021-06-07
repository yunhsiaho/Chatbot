let socket = io( )
$(()=>{
    $("#send").click(()=>{
        // addMessages({name:"John", message:"Hello World!"})
        let message = {
            name:$("#name").val(),
            message:$("#message").val()
        }
        if($("#name").val()==""){
            alert("Please enter your name");
            return;
        }
        if($("#message").val()==""){
            alert("Please enter your message");
            return;
        }
        postMessages(message);
        window.location.reload();
        console.log($("#name").val()+$("#message").val());
    })
    $("#delete").click(()=>{
        deleteMessages();
    })
    getMessages();
})
socket.on('message',addMessasge)

function addMessages(message){
    $("#messages").append(
        `<div class="bg-info p-3 m-3 col-10 text-light border rounded"><h4>${message.name}</h4>
        <p>${message.message}</p> 
        <button id="delete" class="btn btn-danger m-3">Delete</button></div> `
        );
}

function getMessages(){
$.get('https://hsia-chatbot.herokuapp.com/messages',(data)=>{
    data.forEach(addMessages);
    
})
}

function postMessages(message){

    $.post('https://hsia-chatbot.herokuapp.com/messages',message);
    
}

function deleteMessages(message){

    $.delete('https://hsia-chatbot.herokuapp.com/messages',message);
    
}


// Intiliaze Sentimood Library
var sentimood = new Sentimood();
// Empty array for finding average mood score
var arr = [];

// Generates random number for username extension
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Random username for users
var username = 'User' + getRandomArbitrary(100, 1000);

// Start jQuery
$(function(){
    // Loads socket.io-client
    var socket = io();

    // Sends input value to the server
    $('button').click(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    // Sends input value to the client
    // Check message for sentiment
    socket.on('chat message', function(msg){
        var analysis = sentimood.analyze(msg);

        // Ensures user does not send empty message 
        // Adds animation to the send button
        if(msg.length > 0){
            $('.send-button').css("background-color", "#535353");
            $('ul').append('<i class="material-icons arrow">arrow_drop_up</i>'+
            '<li class="text-bubble"><p class="username"><strong>' + username +'</strong></p>'+ msg +'</li>');
            setTimeout(function(){$('.send-button').css("background-color", "#404040")}, 200);
        }else{
            $('.send-button').css("background-color", "#ff3232")
            setTimeout(function(){$('.send-button').css("background-color", "#404040"); alert('Message empty!');}, 200);
        }

        // Finds average sentiment score and changes background accordingly
        function bgColor(){
            var total = 0;
            arr.push(analysis.score);
            
            for(i=0; i<arr.length; i++){
                total += arr[i];
                average = Math.floor(total/arr.length);
            }
            switch(average) {
                case -5:
                case -4:
                case -3:
                case -2:
                case -1:
                    $("body").css("background-image", "url('/img/negative.png')");
                    break;
                case 0:
                case 1:
                    $("body").css("background", "url('/img/neutral.png')");
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                    $("body").css("background", "url('/img/positive.png')");
                    break;
            }
        }

        bgColor();
    });

});

// End jQuery

var url, match, markers;
var currentUrl;
var matchcode;
var urlUserName;
var getAllMatches = "https://team-grape.herokuapp.com/api/";

url = window.location; 
//url with user name and matchcode
currentUrl = window.location.hash.substr(1);
//matchcode from url
matchcode = currentUrl.substr((currentUrl.length)-5);
//username from url 
urlUserName = currentUrl.substr(0, ((currentUrl.length)-15));

//this will just say that you won whenever we reload the page
const getAllCorrectAnswer = getAllMatches + 'getmatchbycode/' + matchcode;
fetch(getAllCorrectAnswer)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      markers = json.Users[0].correct_answer;
      if(markers >= 5 ){
        // window.location.href = '/leaderboard.html?user=#' + url.urlUserName + '?matchId=#'+ matchcode;

        // Get the starttime from DB
        const getAllCorrectAnswer = getAllMatches +'getmatchbycode/' + matchcode;
        fetch(getAllCorrectAnswer)
        .then(function(response) {
          if(response.ok) {
            response.json()
          .then(function(json) {
            var startTime; 
            startTime = json.Users[0].startTime; 
  
              
              function totalMatchTime() {
                var timeInMs;
                var totalTimeInMs;
                var hours;
                var minutes;
                var seconds;
                var totalTime;

                // Take the endtime and compare it to the starttime to get the total time for the game.
                // Convert the total time in milliseconds to a better format (hours:minutes:seconds)
                timeInMs = Date.now();
                totalTimeInMs = timeInMs - startTime;
                totalTimeInMs = Math.floor(totalTimeInMs / 1000);
                hours = Math.floor(totalTimeInMs / 3600);
                totalTimeInMs -= hours * 3600;
                minutes = Math.floor(totalTimeInMs / 60);
                totalTimeInMs -= minutes * 60;
                seconds = parseInt(totalTimeInMs % 60, 10);
                totalTime = (hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
                
                console.log(totalTime);
                
                // Put the converted format of totaltime in the DB
                fetch(getAllMatches + 'updatematch/' + totalTime + '/' + matchcode, {
                  method: 'PUT',  
                  headers: new Headers({
                    'Content-Type': 'application/json'
                  })
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
              }
              totalMatchTime();  
              $('#\\#myModal1').modal('show');
  
          })
        }
      })


      }
  });
}
});

//get all correct answers. You get only one number
function addCorrectAnswer() {
//const getAllCorrectAnswer = getAllMatches +'getmatchbycode/' + matchcode;
fetch(getAllMatches +'getmatchbycode/' + matchcode)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      var markers = json.Users[0].correct_answer;   
      if(!(markers >= 5)){
        //comment goes here
        var url = getAllMatches +'updatematch/'+ matchcode;

      $.ajax({
        type: "PUT",
        url: url,
        data: JSON,
      });
//window.location.href = './leaderboard.html?user=#' + url.urlUserName + '?matchId=#'+ matchcode;
      } else {
//if correct answer this will add  +1 in db 
     alert('You already won!');
     //take them to stat page.
  }      
  });
}
});
}

//This will check how many makers

// Tryck på felsvar, adda css class som gör att den blir röd
jQuery('.button1').click(function() {
    if (!jQuery(this).hasClass('wrong-answer')) {
    jQuery('.button1').removeClass('wrong-answer');
    jQuery(this).toggleClass('wrong-answer');
  }
});
// Tryck på rättsvar, adda css class som gör att den blir grön
    jQuery('.button12').click(function() {  
    if (!jQuery(this).hasClass('right-answer')) {
    jQuery('.button12').removeClass('right-answer');
    jQuery(this).toggleClass('right-answer');
    addCorrectAnswer(); //this function will add +1 in db if answer is correct
  }
});

// Gör att du inte kan trycka i alla frågor samtidigt.
function DisableButtons()
{    $(".button1").attr("disabled", true);
	$(".button12").attr("disabled", true);
}
// När du har svarat och trycker vill svara på fråga, tabort grön/röd färg så dom blir som nya
document.getElementById("myButton").addEventListener("click", function(){
 $(".button1").attr("disabled", false);
	$(".button12").attr("disabled", false);
	  jQuery('.button12').removeClass('right-answer');
	    jQuery('.button1').removeClass('wrong-answer');
});

function refresh (){
  	 setTimeout(function(){ 
       location.reload(true);
      }, 3500);



}
// När man trycker på rätt svar, visa correct, samt göm modalbox
// När man trycker på Fel svar, visa Incorrect, samt göm modalbox
function correct() {
    document.getElementById("test1").innerHTML = "Correct";
    console.log("match:" + match);
    marker[match].setMap(null);
    marker[match].setVisible(false);
	 setTimeout(function(){ $('#\\#myModal').modal('hide'); }, 1000);
}

function incorrect1() {
    document.getElementById("test").innerHTML = "Incorrect";
	  setTimeout(function(){ $('#\\#myModal').modal('hide'); }, 1000);
	
}
function incorrect2() {
    document.getElementById("test2").innerHTML = "Incorrect";
	  setTimeout(function(){ $('#\\#myModal').modal('hide'); }, 1000);
	
}
function incorrect3() {
    document.getElementById("test3").innerHTML = "Incorrect";
	  setTimeout(function(){ $('#\\#myModal').modal('hide'); }, 1000);
	
}


// När man answer question räkna ner från 16..
$(".startclock").click(function(){
  var counter = 16;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter === 0) {
        clearInterval(counter);
    }
  }, 1000);   
});
 var clicks = 0;
    function counter() {
        clicks += 1;
        document.getElementById("counter").innerHTML = clicks;
		document.getElementById("rett").innerHTML = clicks;
        

 }
  
  // När man trycker på Answer question, så blir den disable i 16 sekunder, så man ej ska kunna spamma å få nya modalboxes,samt ändrar text på knappen.
  var fewSeconds = 16;
$('#myButton').click(function(){
    var btn = $(this);
    btn.prop('disabled', true);
      $('button.btn-primary.knapp').text('Checking answer...');
    setTimeout(function(){
        btn.prop('disabled', false);
		  $('button.btn-primary.knapp').text('Answer Question');
    }, fewSeconds*1000);
});
    // Reggar hur många gånger man tryckt på Answer question, visar det som "you reached checkpoint 1"
  var checkpoints = 0;
$('#myButton').click(function(){
 checkpoints += 1;
        document.getElementById("checkpoints").innerHTML = checkpoints;
});

var winning = new Audio();
winning.src = "winning.mp3";
function winningsound() {
    winning.play();
}

var losing = new Audio();
losing.src = "losing.mp3";
function losingsound() {
    losing.play();
}
var correctAnswer = [];
fetch("https://team-grape.herokuapp.com/api/getmatchbycode/" + matchcode)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      ggr = json.Users[0].correct_answer;  
      correctAnswer.push(ggr);

      console.log(Number(correctAnswer[0]));
      
      document.querySelector("#counter").innerHTML = correctAnswer[0];



      function end() {
        console.log("end reached!");
        //marker += 1;
    console.log(typeof correctAnswer[0]);
             if (Number(correctAnswer[0]) <= 1) {
               setTimeout(function(){ 
     
		 $('#\\#myModal').remove();
		  $('button.btn-primary.knapp').remove();
		  $('#\\#myModal1').modal('show');
        document.querySelector("#rett").style.display = "block";
        document.querySelector("#rett").innerHTML = correctAnswer[0];
       }, 3000);
		  //Modal, du har klarat av spelet
    } else {
      console.log("Not true");
    }
 }
 


  })
}
})

 //ggr;
// var newEmpty = correctAnswer;
//  console.log(correctAnswer);
//     function end() {
//         //marker += 1;
    
//              if (correctAnswer[0] == 1) {
//                setTimeout(function(){ 
     
// 		 $('#\\#myModal').remove();
// 		  $('button.btn-primary.knapp').remove();
// 		  $('#\\#myModal1').modal('show');
//         document.querySelector("#rett").style.display = "block";
//         document.querySelector("#rett").alert("Hej") = correctAnswer[0];
//        }, 11000);
// 		  //Modal, du har klarat av spelet
//     }
//  }
 
 
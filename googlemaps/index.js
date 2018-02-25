var url = window.location; 
//url with user name and matchcode
var currentUrl = window.location.hash.substr(1);
//matchcode from url
var matchcode = currentUrl.substr((currentUrl.length)-5);
//username from url 
var urlUserName = currentUrl.substr(0, ((currentUrl.length)-15));

//this will just say that you won whenever we reload the page
const getAllCorrectAnswer = 'http://localhost:3000/api/getmatchbycode/' + matchcode;
fetch(getAllCorrectAnswer)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      var markers = json.Users[0].correct_answer;
      if(markers >= 5 ){
        alert("You won!");
      }
  });
}
});

//get all correct answers. You get only one number
function addCorrectAnswer() {
const getAllCorrectAnswer = 'http://localhost:3000/api/getmatchbycode/' + matchcode;
fetch(getAllCorrectAnswer)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      var markers = json.Users[0].correct_answer;   
      if(!(markers >= 5)){
        var url = 'http://localhost:3000/api/updatematch/'+ matchcode;
$.ajax({
  type: "PUT",
  url: url,
  data: JSON,
});
        //take them to state page
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


// När man trycker på rätt svar, visa correct, samt göm modalbox
// När man trycker på Fel svar, visa Incorrect, samt göm modalbox
function correct() {
    document.getElementById("test1").innerHTML = "Correct";
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
        
         if (clicks === 5) {
        alert("You got every single question right GZ!")
    }
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
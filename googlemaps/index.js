
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


// När man trycker på rätt svar, så räknar den det.
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
// När man trycker på rätt svar, så räknar den det.
count = 0
counter= function(){
var counter =
document.getElementById("counter");
counter.innerHTML = ++ count;
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
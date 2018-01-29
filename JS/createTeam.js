document.getElementById("myBtn").addEventListener("click", function(){
  var teamName = document.getElementById("teamName");
  event.preventDefault()

 if (teamName.value !== ''){
  window.open("joinplayer.html","_self"); 
 } else {
  document.getElementById("emptyField").innerHTML ='<span style="color: #fff">You must enter a teamname!</span>';
 }
});
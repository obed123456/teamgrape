  //save username from url
  var currentUser = window.location.hash.substr(1);
  
  //create random code.
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  var matchcode = makeid();


//Start time of match when it starts
  function getStartTime() {
    var d = new Date();
    n = d.getTime();    
    return n;
}
var starttime = getStartTime();


//This will start new match and add in database. We call this function when you click on start match.
//This will take user to next page aswell

function startNewMatch(){
fetch('https://team-grape.herokuapp.com/api/startmatch/', {
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
        },
        body:JSON.stringify({uname: currentUser, matchcode: matchcode, starttime:starttime})
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      window.location.href = 'googlemaps/googlemap.html?user=#' + currentUser + '?matchId=#'+ matchcode;      
    }

  //this will add user name in menu
  document.getElementById("username").innerHTML = 'User: ' + currentUser;
  //this function will chnage url for google map page with user id and current code 
  //new match row will be created in db  along with uniq match code.
  document.getElementById("joinMatch").addEventListener('click', addPost);
  function addPost(){   
    startNewMatch();
}

//This function is to take users back
document.getElementById("leaderboard").addEventListener("click", leaderboard);

function leaderboard() {
  window.location.href = 'leaderboard.html?user=#' + currentUser;  
}
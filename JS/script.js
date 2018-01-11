function check() { 
    var userName = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
  /*function to check userid & password
                the following code checkes whether the entered userid and password are matching*/
      if (userName == "team" && pass == "grape"){
         window.open("https://www.google.se/");
      } else {
        console.log("false");
      }
    }

    
    
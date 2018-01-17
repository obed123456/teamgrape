function check() { 
    let code = document.getElementById('codeInput').value;
  /*function to check userid & password
                the following code checkes whether the entered userid and password are matching*/
      if (code == "join"){
         window.open("https://www.google.se/");
      } else {
        console.log("false");
        alert("false");
      }
    }
    document.getElementById("codeGenerator").addEventListener("click", check);
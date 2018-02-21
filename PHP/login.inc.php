<?php

session_start();


if (isset($_POST['submit'])) {

  include_once 'dbh.inc.php';

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);


  //Error handlar 
  //Check if inputs are empty 

  if(empty($uid) || empty($pwd)){
    header("Location: index.php?login=empty");
    exit();
  } else{
    $sql = "SELECT * FROM users WHERE user_name ='$uid' OR user_email ='$uid'";
    $result = mysqli_query($conn, $sql); 
    $resultCheck = mysqli_num_rows($result);
    if($result < 1 ){
      header("Location: index.php?login=error");
      exit();
    } else{
      if($row = mysqli_fetch_assoc($result)){
        //Dehashing the password 
        $hashedPwdCheck = password_verify($pwd, $row['user_pwd']);
        if($hashedPwdCheck == false){
          header("Location: index.php?login=invalidpassowrd");
          exit();
        } elseif($hashedPwdCheck == true){
          //login the user here
          $_SESSION['u_id'] = $row['user_id'];
          $_SESSION['u_uid'] = $row['user_uid'];
          $_SESSION['u_email'] = $row['user_email'];
          header("Location: ../startpage.html#".$uid);
          exit();
        }
      }
    }
  }
  }  else{
    header("Location: index.php?login=error");
    exit();
}
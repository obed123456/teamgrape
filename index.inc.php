<?php

if (isset($_POST['submit'])) {

	$dbServername = "localhost";
	$dbUsername = "root";
	$dbPassword = "";
	$dbname = "loginsystem";

	$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbname);

	$uid = mysqli_real_escape_string($conn, $_POST['uid']);
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);


	if(empty($uid) || empty($email) || empty($pwd)) {
		exit();
	} else {
		$sql = "INSERT INTO users (user_name, user_email, user_pwd) VALUES ('$uid', '$email', '$pwd');";
		mysqli_query($conn, $sql);
		header("Location: index.php?signup=success");
		exit();
	}
} else {

	header("Location: index.php?signup=failed");
	exit();
}

?>
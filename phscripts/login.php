<?php

include 'password.php';
session_start();
$hash = '$2y$11$FX8tiY8k1cul/XgXqiIczOLpggXotaiK1J3E7nlkey92P3a6ENbxG';
if (isset($_SESSION['jpauth'])) {
	echo json_encode(1);
	return 1;
} 
$pass = $_POST['pass'];
$pass_hashed = password_verify($pass,$hash);
if ($pass_hashed == true){
	$_SESSION['jpauth'] = 1;
	echo json_encode(1);
	return 1;
}else{
	unset($_SESSION['jpauth']);
	echo json_encode(-1);
	return 1;
}


?>

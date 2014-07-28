<?php

session_start();
$auth = 0;

if (isset($_SESSION['jpauth'])) {
	$auth = 1;
} else {
	$auth = -1;
}

echo json_encode($auth);

?>

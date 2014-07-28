<?php


	session_start();
	if (isset($_SESSION['jpauth'])){

		$title = $_POST['title'];

		$dir = '/var/www/dev_jackpine/jekyll/_posts/';
		$full = $dir . $title;

		$file = readfile($full);

		echo json_encode($file);
		return;
	}else {
		return -1;
	}


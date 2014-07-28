<?php

	
	session_start();
	if (isset($_SESSION['jpauth'])){
		$dir = '/var/www/dev_jackpine/jekyll/_posts';
		$files = scandir($dir);
		$afiles = array();
		foreach ($files as $f){
			if ($f != '.' && $f != '..'){
				array_push($afiles,$f);
			}
		}
		echo json_encode($afiles);
		return;
	}else {
		return -1;
	}




?>

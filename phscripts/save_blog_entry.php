<?

	session_start();
	if (isset($_SESSION['jpauth'])){

		$title = $_POST['title'];
		$text = $_POST['text'];
		$dir = '/var/www/dev_jackpine/jekyll/_posts/';
		$file_name = $dir . $title;

		echo json_encode(file_put_contents($file_name,$text));
		return 1;
	}else {
		return -1;
	}




?>

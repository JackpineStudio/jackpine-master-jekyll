<?php


$box = $_POST['box'];

$file = "/var/www/dev_jackpine/jekyll/cam_images.txt";

echo json_encode(file_put_contents($file,$box));



?>

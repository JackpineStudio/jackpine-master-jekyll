<?php


$file = "/var/www/dev_jackpine/jekyll/cam_images.txt";

echo json_encode(file_get_contents($file));

?>

<?php
// This is a very basic server-side proxy script for demo purposes.
// This assumes text/html Content-Type as it won't grab and forward it.
readfile($_GET['uri']);
?>
<?php
$response = json_encode(array(
  'payload' => php_uname('s') . ' ' . php_uname('m') . ' running PHP ' . phpversion()
));
if (!isset($_GET['callback']) || '' == ($cb = trim($_GET['callback']))) {
  header('Content-Type: application/json');
  echo $response;
} else {
  header('Content-Type: text/javascript');
  echo "$cb($response);";
}
?>

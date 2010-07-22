<?php
date_default_timezone_set('Europe/Paris');
$loadAvg = sys_getloadavg();
$response = json_encode(array(
  'os_architecture' => php_uname('s') . ' ' . php_uname('m'),
  'stamp' => strftime('%m/%d/%Y %H:%M:%S %z'),
  'load_avg' => $loadAvg[0],
  'php_version' => phpversion(),
  'json_version' => phpversion('json')
));
if (!isset($_GET['callback']) || '' == ($cb = trim($_GET['callback']))) {
  header('Content-Type: application/json');
  echo $response;
} else {
  header('Content-Type: text/javascript');
  echo "$cb($response);";
}
?>

<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
// Prototype's Ajax.Base always sends the two following headers, which means,
// incidentally, that CORS-compliant request will preflight, so we need to
// validate these headers and distinguish OPTIONS (preflight) and non-OPTIONS
// (regular) requests.
header('Access-Control-Allow-Headers: X-Requested-With, X-Prototype-Version');

// A more generic way of letting all nonstandard headers in would be:
//
// $allowedCustomHeaders = array();
// foreach ($_SERVER as $key => $_)
//   if (0 == strpos('X-', $key))
//     array_push($allowedCustomHeaders, $key);
// if (count($allowedCustomHeaders) > 0)
//   header('Access-Control-Allow-Headers: ' . join(', ', $allowedCustomHeaders));
//
if ('OPTIONS' == $_SERVER['REQUEST_METHOD'])
  exit(0);
?>
<p>Yay! This was Ajax-loaded across domains!</p>
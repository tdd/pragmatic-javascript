<?php
sleep(rand(0, 3));
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Temporarily disabling a submit button - Pocket JavaScript</title>
  <link rel="stylesheet" type="text/css" href="submit.css" />
  <script type="text/javascript" src="../../prototype.js"></script>
  <script type="text/javascript" src="submit.js"></script>
</head>
<body>
<h1>Temporarily disabling a submit button</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<h2>Comments</h2>

<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<h2>Add a comment</h2>

<!-- START:MAIN -->
<form id="commentForm" action="post_comment.php">
  <p>
    <label for="edtText">Your text</label>
    <textarea id="edtText" name="text" cols="40" rows="5"></textarea>
  </p>
  <p><input type="submit" class="submit" value="Send" /></p>
</form>
<!-- END:MAIN -->
</body>
</html>
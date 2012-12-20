<?php
foreach ($_POST as $key => $value) {
?>
<p><?php echo htmlspecialchars($key) ?> = <?php echo htmlspecialchars($value) ?></p>
<?php
}
?>

<h1>Acknowledging uploaded files:</h1>
<ul>
  <?php
  foreach ($_FILES['files']['name'] as $index => $fileName) {
    if ('' == $fileName) continue;
    $type = $_FILES['files']['type'][$index];
    $size = $_FILES['files']['size'][$index];
    echo "<li><tt>" . htmlspecialchars($fileName) . "</tt> (" . htmlspecialchars($type) .
      ", " . $size . " bytes)</li>";
  }
  ?>
</ul>
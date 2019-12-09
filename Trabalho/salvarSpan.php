<?php
    $arquivo = fopen("spans.csv", "a");
    fwrite($arquivo, "{$_POST['id']},{$_POST['tipo']},{$_POST['conteudo']}".PHP_EOL, 10000);
    fclose($arquivo);
?>
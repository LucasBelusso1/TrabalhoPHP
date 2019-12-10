<?php
    $arquivo = fopen("spans.csv","r");
    $dados =[];
    while(($linha = fgetcsv($arquivo, 10000, ',')) !== false){
        $dados[] = $linha;
    }
    fclose($arquivo);
    $arquivo = fopen("spans.csv","w");
    foreach($dados as $dado){
        if($dado[0] === $_POST['id']) continue;
        
        fwrite($arquivo, "{$dado[0]},{$dado[1]},{$dado[2]}". PHP_EOL, 10000);
    }
    
    fclose($arquivo);
?>
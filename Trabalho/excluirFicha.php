<?php
    $arquivo = fopen("spans.csv","r");
    fgetcsv($arquivo, 10000, ';');
    $dados =[];
    while(($linha = fgetcsv($arquivo, 10000, ';')) !== false){
        $dados[] = $linha;
    }
    fclose($arquivo);
    $arquivo = fopen("spans.csv","w");
    foreach($dados as $dado){
        if($dado[0] !== $_POST['id']) continue;
        
        fwrite($arquivo, "" . PHP_EOL, 100);
    }
    
    fclose($arquivo);
?>
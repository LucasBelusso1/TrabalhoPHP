<?php
    $arquivo = fopen("spans.csv", "r");
    $dados = [];
    while(($linha = fgetcsv($arquivo, 10000, ";")) !== false) {
        $dados[] = [
            'id' => $linha[0],
            'span' => $linha[1]
        ];
    }
    fclose($arquivo);
    print json_encode($dados);
?>
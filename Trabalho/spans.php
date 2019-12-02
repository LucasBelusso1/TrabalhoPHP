<?php
    $arquivo = fopen("spans.csv", "r");
    $dados = [];
    while(($linha = fgetcsv($arquivo, 500, ",")) !== false) {

        $dados[] = [
            'span' => $linha[0]
        ];
    }
    fclose($arquivo);
    print json_encode($dados);
?>
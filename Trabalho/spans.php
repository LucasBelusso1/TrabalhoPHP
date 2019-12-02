<?php
    $arquivo = fopen("spans.csv", "r");
    $dados = [];
    while(($linha = fgetcsv($arquivo, 500, ",")) !== false) {
<<<<<<< HEAD
        $dados[] = [
=======
        $dados = [
>>>>>>> 9cfdecdf87095037dee6278ce2ce910660e9cebb
            'span' => $linha[0]
        ];
    }
    fclose($arquivo);
    print json_encode($dados);
?>
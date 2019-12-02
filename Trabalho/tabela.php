<?php
    $arquivo = fopen("dados.csv", "r");
    $dados = [];
    while(($linha = fgetcsv($arquivo, 500, ",")) !== false) {
        $dados[] = [
            'horario' => $linha[0],
            'coluna1' => $linha[1],            
            'coluna2' => $linha[2],            
            'coluna3' => $linha[3],            
            'coluna4' => $linha[4],
            'coluna5' => $linha[5]         
        ];
    }
    fclose($arquivo);
    print json_encode($dados);
?>
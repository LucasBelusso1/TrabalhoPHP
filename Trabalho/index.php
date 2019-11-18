<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Horários</title>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col" style="max-width: 30%;">
                <strong>SELECIONE O TIPO DE CADASTRO</strong>
                <select onchange="ColarInputs()" class="custom-select custom-select-lg mb-3" name="Tipo" id="tipo">
                    <option value="1">Curso</option>
                    <option value="2">Componente Curricular</option>
                    <option value="3">Docente</option>
                    <option value="4">Horário</option>
                </select>
                <br/>
            </div>
            <div class="col-xl">
                <table class="table table-striped table-dark">
                    <th>Horário</th>
                    <th>Segunda</th>
                    <th>Terça</th>
                    <th>Quarta</th>
                    <th>Quinta</th>
                    <th>Sexta</th>
                <?php
                if (($arquivo = fopen("index.csv", "r")) !== false) {
                    fgetcsv($arquivo, 50, ',');
                    while (($linha = fgetcsv($arquivo, 50, ',')) !== false) {
                        $linha1 = $linha[1] != "" ? $linha[1] : "<label class='alert alert-light'>Vazio</label>";
                        $linha2 = $linha[2] != "" ? $linha[2] : "<label class='alert alert-light'>Vazio</label>";
                        $linha3 = $linha[3] != "" ? $linha[3] : "<label class='alert alert-light'>Vazio</label>";
                        $linha4 = $linha[4] != "" ? $linha[4] : "<label class='alert alert-light'>Vazio</label>";
                        $linha5 = $linha[5] != "" ? $linha[5] : "<label class='alert alert-light'>Vazio</label>";
                     print "<tr>
                            <td><label class='btn btn-success'><span class='oi oi-clock'></span>{$linha[0]}</label></td>
                            <td> {$linha1} </td>
                            <td> {$linha2} </td>
                            <td> {$linha3} </td>
                            <td> {$linha4} </td>
                            <td> {$linha5} </td>
                        </tr>";
                    }
                    fclose($arquivo);
                } else {
                    die("Ocorreu um erro ao abrir arquivo!");
                }
                ?>
                </table>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="index.js"></script>
    <link rel="stylesheet" href="index.css">
</body>

</html>
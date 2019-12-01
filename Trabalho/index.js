$('document').ready(function() {
    montarTabela();
    montarGradeSpan();
})

function colarInputs() {
    var html;
    $("#opcoes>*").remove();
    $("#botton").remove();
    if ($("select").val() == 1) {
        html = "<input placeholder='Nome do curso' class='list-group-item'></br>";
    } else if ($("select").val() == 2) {
        html = "<input placeholder='Nome do componente' class='list-group-item'></br>";
        html += "<input placeholder='Creditos' class='list-group-item'></br>";
        html += "<input placeholder='Curso' class='list-group-item'></br>";
        html += "<input placeholder='Período  na grade curricular' class='list-group-item'></br>";
    } else if ($("select").val() == 3) {
        html = "<input placeholder='Nome do docente' class='list-group-item'></br>";
    } else if ($("select").val() == 4) {
        html = "<input placeholder='Horário' class='list-group-item'></br>";
    }
    var button = "<button onclick='geraSpan()' class='btn btn-success' id='botton'>Gerar</button>"
    $("#opcoes").append(html);
    $("#button").append(button);
}

function montarTabela() {
    $.ajax({
        url: 'tabela.php',
        method: 'GET'
    }).done(function(response) {
        var data = JSON.parse(response)
        data.forEach(function(campos) {
            console.log(campos);
        });
    });
}

function montarGradeSpan() {
    $.ajax({
        url: 'spans.php',
        method: 'GET'
    }).done(function(response) {
        var data = JSON.parse(response);
        data.forEach(function(campo) {
            console.log(campo);
            $("#fichas").append(campo.span);
        });
    });
}

function geraSpan() {
    var td;
    if ($("select").val() == 1) {
        td = "<tr><td class='btn btn-secondary' id ='xesquedele' draggable='true'>1 <button class='btn btn-danger' id='excluir' onclick='excluirFicha()'>X</button></td></tr>";
    } else if ($("select").val() == 2) {
        td = "<tr><td class='btn btn-primary' draggable='true'>2 <button class='btn btn-danger' id='excluir' onclick='excluirFicha()'>X</button></td></tr>";
    } else if ($("select").val() == 3) {
        td = "<tr><td class='btn btn-danger' draggable='true'>3 <button class='btn btn-danger' id='excluir' onclick='excluirFicha()'>X</button></td></tr>";
    } else if ($("select").val() == 4) {
        td = "<tr><td class='btn btn-dark' draggable='true'>4 <button class='btn btn-danger' id='excluir' onclick='excluirFicha()'>X</button></td></tr>";
    }
    salvaSpan(td);
    $("#fichas").append(td);
}

function salvaSpan(ficha) {
    $.ajax({
        url: 'salvarSpan.php',
        method: 'POST',
        data: { ficha: ficha }
    }).done(function(response) {
        console.log("salvou!");
    })
}

function excluirFicha(event) {
    console.log(event);
}

// Elemento que está sendo arrastado
var e = null;

// função que é executada quando começa a arrastar um elemento
function dragstart(event, elemento) {
    //Armazenando a referência de um elemento JQUERY
    e = $(elemento)
        //trocando css de um elemento com JQUERY
    $(elemento).css('background-color', 'blue');
    console.log('Começou a mover')
}

// função que é executada quando termina de arrastar um elemento
function dragend(event, elemento) {
    //trocando css de um elemento com JQUERY
    $(elemento).css('background-color', '');
    console.log('Terminou de mover')
}

// função executada enquanto o elemento é arrastado
function drag(event, elemento) {
    console.log(
        $(elemento).html() +
        ' está sendo movimentado'
    )
}

//função executada quando um elemento entra da área de drop
function dragenter(event, elemento) {
    //Testando se o elemento pode ser solto nesse local
    if (permite(elemento)) {
        //troca de css com JQUERY
        $(elemento).css('border', 'dashed 2px gray');
    } else {
        //troca de css com JQUERY
        $(elemento).css('background-color', 'red');
    }
}

//função executada quando o elemento deixa uma área de drop
function dragleave(event, elemento) {
    //Testando se o elemento pode ser solto nesse local
    if (permite(elemento)) {
        //troca de css com JQUERY
        $(elemento).css('border', '');
    } else {
        //troca de css com JQUERY
        $(elemento).css('background-color', '');
    }
}

//  simulando bloqueios - Aqui o correto é armazenar os bloqueios de todos os professores
var bloqueios = ['d4', 'd3'];

// função utilizada para testar se um elemento pode ser solto no local
function permite(elemento) {
    // pega o id do elemento
    let id = $(elemento).attr('id')
        //verifica se o id está dentro da  variável bloquieos
    let novo = bloqueios.filter(function(b) {
        return id == b
    });

    //Retorna true se o tamanho for zero (pode soltar)
    return novo.length === 0
}

// função executada enquanto o elemento estiver sobre o local de drop
function dragover(event, elemento) {
    //Principal função para saber se pode soltar o elemento
    //se for um local que possa realizar o drop
    //deve-se executar event.preventDefault()
    //No exemplo, se permite()=== true, então executa o comando
    //que permite o drop;
    if (permite(elemento))
        event.preventDefault();
}

//função executada quando o drop é concluído.
function drop(event, elemento) {
    //troca css com JQUERY
    $(elemento).css('border', '');
    //Adicionar o elemento na área de drop com JQUERY
    $(elemento).append(e)
}
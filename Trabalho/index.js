$('document').ready(function() {
    montarTabela();
    montarGradeSpan();
})

function colarInputs() {
    var html;
    $("#opcoes>*").remove();
    $("#botton").remove();
    if ($("select").val() == 1) {
        html = "<input placeholder='Nome do curso' class='list-group-item' id='curso'></br>";
    } else if ($("select").val() == 2) {
        html = "<input placeholder='Nome do componente' class='list-group-item' id='componente'></br>";
        html += "<input placeholder='Creditos' class='list-group-item' id='creditos'></br>";
        html += "<input placeholder='Curso' class='list-group-item' id='curso'></br>";
        html += "<input placeholder='Período  na grade curricular' class='list-group-item' id='periodo'></br>";
    } else if ($("select").val() == 3) {
        html = "<input placeholder='Nome do docente' class='list-group-item' id='docente'></br>";
    } else if ($("select").val() == 4) {
        html = "<input placeholder='Horário' class='list-group-item' id='horario'></br>";
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
        let dados = JSON.parse(response);
        dados.forEach(function(campo) {
            let linha = "<tr><td class ='horarioTabela'>" + campo.horario + "</td>"
            linha += "<td @dragDrop>" + campo.coluna1 + "</td>";
            linha += "<td @dragDrop>" + campo.coluna2 + "</td>";
            linha += "<td @dragDrop>" + campo.coluna3 + "</td>";
            linha += "<td @dragDrop>" + campo.coluna4 + "</td>";
            linha += "<td @dragDrop>" + campo.coluna5 + "</td></tr>";
            linha = linha.split("@dragDrop").join(" class='dia' ondrop='drop(event, this)' ondragover='dragover(event, this)' ondragleave='dragleave(event, this)' ondragenter='dragenter(event, this)'");
            $("#tabela").append(linha);
        });
    });
}

function montarGradeSpan() {
    $.ajax({
        url: 'spans.php',
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        let dados = JSON.parse(response);
        dados.forEach(function(fichas) {
            console.log(fichas);
            $("#fichas").append(fichas.span);
        });
    });
}

function geraSpan() {
    var id = 0;
    $.ajax({
        url: 'spans.php',
        method: 'GET'
    }).done(function(response) {
        let dados = JSON.parse(response);
        dados.forEach(function(fichas) {
            id = fichas.id;
        });
        id += 1;
    });
    var td;
    if ($("select").val() == 1) {
        td = "<tr><td class='btn btn-secondary' id='" + id + "' @dragDrop >" + $("#curso").val() + "<button class='btn btn-danger' id='excluir' onclick='excluirFicha(" + id + ")'>X</button></td></tr>";
    } else if ($("select").val() == 2) {
        td = "<tr><td class='btn btn-primary' id='" + id + "' @dragDrop>" + $("#componente").val() + $("#creditos").val() + $("#curso").val() + $("#periodo").val() + "<button class='btn btn-danger' id='excluir' onclick='excluirFicha(" + id + ")'>X</button></td></tr>";
    } else if ($("select").val() == 3) {
        td = "<tr><td class='btn btn-danger' id='" + id + "' @dragDrop>" + $("#docente").val() + " <button class='btn btn-danger' id='excluir' onclick='excluirFicha(" + id + ")'>X</button></td></tr>";
    } else if ($("select").val() == 4) {
        td = "<tr><td class='btn btn-dark' id='" + id + "' @dragDrop>" + $("#horario").val() + "<button class='btn btn-danger' id='excluir' onclick='excluirFicha(" + id + ")'>X</button></td></tr>";
    }
    td = td.split("@dragDrop").join("ondrag='drag(event, this)' ondragend='dragend(event, this)' ondragstart='dragstart(event, this)' draggable='true'");
    salvaSpan(td, id);
    $("#fichas").append(td);
}

function salvaSpan(ficha, id) {
    $.ajax({
        url: 'salvarSpan.php',
        method: 'POST',
        data: {
            id: id,
            ficha: ficha
        }
    }).done(function(response) {
        console.log("salvou!");
    })
}

function excluirFicha(elemento) {
    console.log(elemento);
    elemento.remove();
}

// FUNÇÕES PARA AS FICHAS
// função executada enquanto o elemento é arrastado
function drag(event, elemento) {

}

// função que é executada quando termina de arrastar um elemento
function dragend(event, elemento) {
    //trocando css de um elemento com JQUERY
    $(elemento).css('opacity', '');
}

// função que é executada quando começa a arrastar um elemento
function dragstart(event, elemento) {
    //Armazenando a referência de um elemento JQUERY
    e = $(elemento)
        //trocando css de um elemento com JQUERY
    e.css('opacity', '0.2');
    console.log('Começou a mover')
}


// Elemento que está sendo arrastado
var e = null;




//FUNÇÃO PARA AONDE AS FICHAS VÃO CAIR
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
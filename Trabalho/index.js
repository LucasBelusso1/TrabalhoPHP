$('document').ready(function() {
    montarTabela();
    montarGradeSpan();
})

function colarInputs() {
    var html;
    $("#opcoes>*").remove();
    $("#botton").remove();
    if ($("select").val() == "CURSO") {
        html = "<input placeholder='Nome do curso' class='list-group-item' id='curso' required='required'></br>";
    } else if ($("select").val() == "COMPONENTE") {
        html = "<input placeholder='Nome do componente' required class='list-group-item' id='componente'></br>";
        html += "<input placeholder='Creditos'required='required' class='list-group-item' id='creditos'></br>";
        html += "<input placeholder='Curso' required='required' class='list-group-item' id='curso'></br>";
        html += "<input placeholder='Período  na grade curricular'  required='required' class='list-group-item' id='periodo'></br>";
    } else if ($("select").val() == "DOCENTE") {
        html = "<input placeholder='Nome do docente' required='required' class='list-group-item' id='docente'></br>";
    } else if ($("select").val() == "HORARIO") {
        html = "<input placeholder='Horário' required='required' class='list-group-item' id='horario'></br>";
    } else if (($("select").val() == "TURMA")) {
        html = "<input placeholder='Ano da turma' class='list-group-item' id='ano' required='required'></br>";
        html += "<input placeholder='Semestre da turma'required='required' class='list-group-item' id='semestre'></br>";
        html += "<hr>";
        html += "<input placeholder='Nome do componente' class='list-group-item' id='componente'></br>";
        html += "<input placeholder='Creditos'required='required' class='list-group-item' id='creditos'></br>";
        html += "<input placeholder='Curso' required='required' class='list-group-item' id='curso'></br>";
        html += "<input placeholder='Período  na grade curricular'  required='required' class='list-group-item' id='periodo'></br>";
        html += "<hr>";
        html += "<input placeholder='Nome do docente' required='required' class='list-group-item' id='docente'></br>";
    } else if ($("select").val() == "BLOQUEIO") {
        html = "<input value='Horário Bloqueado' class='list-group-item' id='bloqueio' required='required' disabled></br>"
    }

    var button = "<button onclick='getUltimoId()' class='btn btn-success' id='botton'>Gerar</button>"
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
        let dados = JSON.parse(response);
        dados.forEach(function(fichas) {
            var html = "<tr><td @tipo id='" + fichas.id + "' ondrag='drag(event, this)' ondragend='dragend(event, this)' ondragstart='dragstart(event, this)' draggable='true' >" + fichas.conteudo + "</td></tr>"
            var tipo;
            switch (fichas.tipo) {
                case ("CURSO"):
                    tipo = "class='btn btn-secondary'";
                    break;
                case ("COMPONENTE"):
                    tipo = "class='btn btn-primary'";
                    break;
                case ("DOCENTE"):
                    tipo = "class='btn btn-warning'";
                    break;
                case ("HORARIO"):
                    tipo = "class='btn btn-dark'";
                    break;
                case ("TURMA"):
                    tipo = "class='btn btn-success'";
                    break;
                case ("BLOQUEIO"):
                    tipo = "class='btn btn-danger";
                    break;
            }
            html = html.split("@tipo").join(tipo);
            $("#fichas").append(html);
        });
    });
}

function geraSpan(id) {
    id += 1;
    var td;
    var conteudo;
    if ($("select").val() == "CURSO") {
        td = "<tr><td class='btn btn-secondary' id='" + id + "' @dragDrop >" + $("#curso").val() + "</td></tr>";
        conteudo = $("#curso").val();
    } else if ($("select").val() == "COMPONENTE") {
        td = "<tr><td class='btn btn-primary' id='" + id + "' @dragDrop>" + $("#componente").val() + $("#creditos").val() + $("#curso").val() + $("#periodo").val() + "</tr>";
        conteudo = $("#componente").val() + "<br/>" + $("#creditos").val() + "<br/>" + $("#curso").val() + "<br/>" + $("#periodo").val();
    } else if ($("select").val() == "DOCENTE") {
        td = "<tr><td class='btn btn-warning' id='" + id + "' @dragDrop>" + $("#docente").val() + "</tr>";
        conteudo = $("#docente").val();
    } else if ($("select").val() == "HORARIO") {
        td = "<tr><td class='btn btn-dark' id='" + id + "' @dragDrop>" + $("#horario").val() + "</tr>";
        conteudo = $("#horario").val();
    } else if ($("select").val() == "TURMA") {
        td = "<tr><td class='btn btn-success' id='" + id + "' @dragDrop>" + $("#ano").val() + $("#semestre").val() + $("#componente").val() + $("#creditos").val() + $("#curso").val() + $("#periodo").val() + $("#docente").val() + "</tr>";
        conteudo = $("#ano").val() + "<br/>" + +$("#semestre").val() + "<br/>" + $("#componente").val() + "<br/>" + $("#creditos").val() + "<br/>" + $("#curso").val() + "<br/>" + $("#periodo").val() + "<br/>" + $("#docente").val();
    } else if ($("select").val() == "BLOQUEIO") {
        td = "<tr><td class='btn btn-danger' id='" + id + "' @dragDrop>" + $("#bloqueio").val() + "</tr>";
        conteudo = $("#bloqueio").val();
    }
    td = td.split("@dragDrop").join("ondrag='drag(event, this)' ondragend='dragend(event, this)' ondragstart='dragstart(event, this)' draggable='true'");
    salvaSpan(id, $("select").val(), conteudo);
    $("#fichas").append(td);
}

function getUltimoId() {
    var id = 0;
    $.ajax({
        url: 'spans.php',
        method: 'GET'
    }).done(function(response) {
        let dados = JSON.parse(response);
        dados.forEach(function(fichas) {
            id = fichas.id;
        });
        geraSpan(parseInt(id));
    });
}

function salvaSpan(id, tipo, conteudo) {
    $.ajax({
        url: 'salvarSpan.php',
        method: 'POST',
        data: {
            id: id,
            tipo: tipo,
            conteudo: conteudo
        }
    }).done(function(response) {
        console.log("salvou!");
    });
}

function excluirFicha(evento, elemento) {
    $(elemento).css('background-color', '');
    var id = e.attr('id');
    console.log(id);
    e.remove();
    $.ajax({
        url: 'excluirFicha.php',
        method: 'POST',
        data: {
            id: id
        }
    }).done(function(response) {
        console.log("excluiu!");
    });
}

// FUNÇÕES PARA AS FICHAS
var e = null;

function drag(event, elemento) {

}

function dragend(event, elemento) {
    $(elemento).css('opacity', '');
}

function dragstart(event, elemento) {
    //Armazenando a referência de um elemento JQUERY
    e = $(elemento);
    e.css('opacity', '0.2');
}
//FUNÇÃO PARA AONDE AS FICHAS VÃO CAIR
function dragenter(event, elemento) {
    if (permite(elemento)) {
        $(elemento).css('border', 'dashed 2px gray');
    } else {
        $(elemento).css('background-color', 'red');
    }
}

function lixoEntra(event, elemento) {
    $(elemento).css('background-color', 'gray');
}

function dragleave(event, elemento) {
    if (permite(elemento)) {
        $(elemento).css('border', '');
    } else {
        $(elemento).css('background-color', '');
    }
}

function lixoSai(event, elemento) {
    $(elemento).css('background-color', '');
}

var bloqueios = ['d4', 'd3'];

function permite(elemento) {
    let id = $(elemento).attr('id')
    let novo = bloqueios.filter(function(b) {
        return id == b
    });

    return novo.length === 0
}

// função executada enquanto o elemento estiver sobre o local de drop
function dragover(event, elemento) {
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
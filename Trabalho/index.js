function ColarInputs() {
    $("input").remove();
    $("br").remove();
    $("button").remove();
    let tipo = $("#tipo").val();
    var inputs = "";
    if (tipo == 1) {
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o nome do professor.'><br/>";
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o nome do curso.'><br/>";
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o horário.'><br/>";
    } else if (tipo == 2) {
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o nome do componente.'><br/>";
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o horário.'><br/>";
    } else if (tipo == 3) {
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o nome do docente.'><br/>";
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o nome do curso.'><br/>";
        inputs += "<input type='text' class='input-group' name='input[]' placeholder='Digite o horário.'><br/>";
    } else {
        inputs += "<input type='text' class='input-group tipo4' name='input[]' placeholder='Digite o horário.'><br/>";
    }
    inputs += "<button class='btn btn-success' onclick='gerarLabel()'>Gerar</button>";

    console.log(inputs);
    let html = $.parseHTML(inputs);
    $("div.col").append(html);
}

function gerarLabel() {

}
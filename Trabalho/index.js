
function ColarInputs() {
        $("input").remove();
        $("br").remove();
        $("button").remove();
       var tipo = $("#tipo").val();
        if (tipo == 1) {
            var inputs = "<input type='text' class='input-group' placeholder='Digite o nome do professor.'><br/>";
            inputs += "<input type='text' class='input-group' placeholder='Digite o nome do curso.'><br/>";
            inputs += "<input type='text' class='input-group' placeholder='Digite o horário.'><br/>";
            inputs += "<button class='btn btn-success'>Gerar</button>";
        } else if (tipo == 2) {
            var inputs = "<input type='text' class='input-group' placeholder='Digite o nome do componente.'><br/>";
            inputs += "<input type='text' class='input-group' placeholder='Digite o horário.'><br/>";
            inputs += "<button class='btn btn-success'>Gerar</button>";
        } else if (tipo == 3) {
            var inputs = "<input type='text' class='input-group' placeholder='Digite o nome do docente.'><br/>";
            inputs += "<input type='text' class='input-group' placeholder='Digite o nome do curso.'><br/>";
            inputs += "<input type='text' class='input-group' placeholder='Digite o horário.'><br/>";
            inputs += "<button class='btn btn-success'>Gerar</button>";
        } else {
            var inputs = "<input type='text' class='input-group' placeholder='Digite o horário.'><br/>";
            inputs += "<button class='btn btn-success'>Gerar</button>";
        }
        var html = $.parseHTML(inputs);
        $("div.col").append(html);
   }
$('document').ready(function() {
        montarTabela();
})

function montarTabela() {
    $.ajax({
        url: 'tabela.php',
        method: 'GET'
    }).done(function(response) {
        const data = JSON.parse(response);
        data.forEach(function(campos) {
            
        })
    })
}

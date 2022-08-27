/*  Local Storage é um recurso do HTML 5 para se armazenar dados que não são perdidos
ao fim da seção, logo, podemos fechar e abrir o browser várias vezes e as informações
gravadas permanecerão lá  */
// Inicio da Função JSON

$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;
	var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados

	tbClientes = JSON.parse(tbClientes); // Converte string para objeto

	if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbClientes = [];

	// Função para adicionar registros
	function Adicionar(){
		//variável para verificar se número de código já existe
		var cli = GetCliente("Codigo", $("#txtCodigo").val());

	// Caso existe é informado ao cliente
		if(cli != null){
			alert("Código já cadastrado.");
			return;
		}
	// caso contrário insere
		var cliente = JSON.stringify({
			Codigo   : $("#txtCodigo").val(),
			Nome     : $("#txtNome").val(),
			Telefone : $("#txtTelefone").val(),
			Email    : $("#txtEmail").val(),
			DtCad    : $("#txtDtCad").val(),
			HrCad    : $("#txtHora").val(),
			DtRea    : $("#txtDataRealizacao").val(),
			HrRea    : $("#txtHoraRealizacao").val(),
			Curso    : $("#curso").val(),


		});
		
		
		
		tbClientes.push(cliente);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro adicionado.");
		return true;
		
	}
	

	// Função para editar clientes
	function Editar(){
		tbClientes[indice_selecionado] = JSON.stringify({
				Codigo   : $("#txtCodigo").val(),
				Nome     : $("#txtNome").val(),
				Telefone : $("#txtTelefone").val(),
				Email    : $("#txtEmail").val(),
				DtCad    : $("#txtDtCad").val(),
				Curso	 : $("#curso").val(),
				HrCad    : $("#txtHora").val(),
				DtRea    : $("#txtDataRealizacao").val(),
				HrRea	 : $("#txtHoraRealizacao").val(),
			});
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}
	// Função para listar clientes
	function Listar(){
	
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>RM</th>"+
			"	<th>Nome</th>"+
			"	<th>Celular</th>"+
			"	<th>Email</th>"+
			"	<th>Data de Cadastro</th>"+
			"	<th>Hora de Cadastro</th>"+
			"	<th>Curso</th>"+
			"	<th>Data de Realização</th>"+
			"	<th>Hora de Realização</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		// Malha de repetição para inserir todos os registros
		 for(var i in tbClientes){
			var cli = JSON.parse(tbClientes[i]);
			// Formatar data para o format brasileiro dia, mes, ano
			var dtfinal = cli.DtCad.substring(8,10) + "/" +cli.DtCad.substring(5,7)  +"/"  +cli.DtCad.substring(0,4);
			var dtfinal2 = cli.DtRea.substring(8,10) + "/" +cli.DtRea.substring(5,7)  +"/"  +cli.DtRea.substring(0,4);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='images/edit.png' alt='"+i+"' class='btnEditar'/><img src='images/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+cli.Codigo+"</td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Telefone+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
										 "	<td>"+dtfinal+"</td>" + 
										 "	<td>"+cli.HrCad+"</td>" + 
										 "	<td>"+cli.Curso+"</td>" + 
										 "	<td>"+dtfinal2+"</td>" + 
										 "	<td>"+cli.HrRea+"</td>" +
										"<tr>");
		 }
	}

		// Função para excluir registros
	function Excluir(){
		tbClientes.splice(indice_selecionado, 1);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro excluído.");
	}

	// função par pesquisar cliente
	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}
	// chamda da função listar clientes
	Listar();

	// Ação com base nos eventos de formulário
	$("#frmCadastro").on("submit",function(){
		if(operacao == "A"){
			return Adicionar();
			}else
			return Editar();		
	});
	// Ação com base nos eventos do botão Editar
	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbClientes[indice_selecionado]);
		$("#txtCodigo").val(cli.Codigo).attr("readonly","readonly");
		$("#txtNome").val(cli.Nome).attr("readonly","readonly");
		$("#txtTelefone").val(cli.Telefone).attr("readonly","readonly");
		$("#txtEmail").val(cli.Email).attr("readonly","readonly");
		$("#txtDtCad").val(cli.DtCad).attr("readonly","readonly");
		$("#txtHrCad").val(cli.HrCad).attr("readonly","readonly");
		// $("#txtCodigo").val(cli.Codigo).attr("readonly","readonly");
		$("#txtNome").focus().attr("readonly","readonly");
		$("#txtDataRealizacao").val(cli.DtRea);
		$("#txtHoraRealizacao").val(cli.HrRea);
	});
	// Ação com base nos eventos do botão Excluir
	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});

	// ultimo codigo
	var ultimo = JSON.parse(tbClientes.slice(-1));
	var ultconv = parseInt(ultimo.Codigo);
	
			$("#txtCodigo").val(ultconv+1);
// status
$("#txtNome").change(function () {
	//alert( $( this ).val() );
	var pessoa = $(this).val();

	if (pessoa == "Wilson") {
		$("#txtStatus").val('Em aberto');
	} else
		$("#txtStatus").val('Em andamento');
});

// Obtém a data/hora atual
	
	var data = new Date();
	
	// Guarda cada pedaço em uma variável
	var dia     = data.getDate();           // 1-31
	var dia_sem = data.getDay();            // 0-6 (zero=domingo)
	var mes     = data.getMonth();          // 0-11 (zero=janeiro)
	var ano2    = data.getYear();           // 2 dígitos
	var ano4    = data.getFullYear();       // 4 dígitos
	var hora    = data.getHours();          // 0-23
	var min     = data.getMinutes();        // 0-59
	var seg     = data.getSeconds();        // 0-59
	var mseg    = data.getMilliseconds();   // 0-999
	var tz      = data.getTimezoneOffset(); // em minutos
	
	if(dia<10) {
		dia = '0'+dia;
	} 
  
	if(mes<10) {
		mes = '0'+ (mes+1);
	} 

	// Formata a data e a hora (note o mês + 1)
	var str_data = dia + '/' + (mes+1) + '/' + ano4; // Brasil
	var str_data_Brazil = ano4 + '-' + mes + '-' + dia; // europeu
	var hora_geral = hora + ':'+ min;
	//var str_hora = hora + ':' + min + ':' + seg;

	// Mostra o resultado
	//alert('Hoje é ' + str_data + ' às ' + str_hora);
	$("#txtDtCad").val(str_data_Brazil);
	$("#txtHora").val(hora_geral);

	//alert(hora_geral);



});


$("#txtTelefone").mask("(00) 0000-0000");

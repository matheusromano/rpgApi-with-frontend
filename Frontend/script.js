var url = 'https://localhost:7248/'

function cadastrar()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'username' : document.getElementById('username').value
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "usuarios"
	// fetch(url + "User/Register",
	// {
	// 	'method': 'POST',
	// 	'redirect': 'follow',
	// 	'headers':
	// 	{
	// 		'Content-Type': 'application/json',
	// 		'Accept': 'application/json'
	// 	},
	// 	'body': JSON.stringify(body)
	// })
	// //checa se requisicao deu certo
	// .then((response) =>
	// {
	// 	if(response.ok)
	// 	{
	// 		return response.text()
	// 	}
	// 	else
	// 	{
	// 		return response.text().then((text) =>
	// 		{
	// 			throw new Error(text)
	// 		})
	// 	}
	// })
	// //trata resposta
	// .then((output) =>
	// {
	// 	console.log(output)
	// 	alert('Cadastro efetuado! :D')
	// })
	// //trata erro
	// .catch((error) =>
	// {
	// 	console.log(error)
	// 	alert('Não foi possível efetuar o cadastro! :(')
	// })
	
	//solucao alternativa usando AJAX
	
	
	let request = new XMLHttpRequest()
	request.onreadystatechange = () =>
	{
		if(request.readyState === 4)
		{
			if(request.status === 200)
			{
				console.log(request.responseText)
				alert('Cadastro efetuado! :D')
			}
			else
			{
				console.error(request.responseText)
				alert('Não foi possível efetuar o cadastro! :(')
			}
		}
	}
	request.open("POST", url + "User/Register")
	request.setRequestHeader('Accept', 'application/json')
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(body))
}





function validaSenha(id)
{
	let divSenha = document.getElementById(id)
	
	let senha = divSenha.value
	
	let temTamanho   = senha.length >= 8
	let temMaiuscula = (/[A-Z]/).test(senha)
	let temMinuscula = (/[a-z]/).test(senha)
	let temNumero    = (/[0-9]/).test(senha)
	let temEspecial  = (/[!@#$%&*?{}<>_]/).test(senha)
	
	if(temTamanho && temMaiuscula && temMinuscula && temNumero && temEspecial)
	{
		divSenha.style.border = 0
		confirmaSenha('confirma-senha')
		return true
	}
	else
	{
		divSenha.style.border = 'solid 1px red'
		confirmaSenha('confirma-senha')
		return false
	}
}

function confirmaSenha(id)
{
	let divConfirma = document.getElementById(id)
	let divSenha = document.getElementById('senha')
	
	if(divConfirma.value == divSenha.value)
	{
		divConfirma.style.border = 0
		return true
	}
	else
	{
		divConfirma.style.border = 'solid 1px red'
		return false
	}
}

function getLogradouro()
{
	fetch('https://viacep.com.br/ws/' + document.getElementById('cep').value + '/json')
	.then(response => response.json())
	.then((output) =>
	{
		document.getElementById('logradouro').value = output.logradouro
	})
}

function listar()
{
	//da um GET no endpoint "usuarios"
	fetch(url + 'User/ListAllUsers')
	.then(response => response.json())
	.then((usuarios) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaUsuarios = document.getElementById('lista-usuarios')
		
		//limpa div
		while(listaUsuarios.firstChild)
		{
			listaUsuarios.removeChild(listaUsuarios.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let usuario of usuarios)
		{
			//cria div para as informacoes de um usuario
			let divUsuario = document.createElement('div')
			divUsuario.setAttribute('class', 'form')
			
			// //pega o id do usuario
			let divId = document.createElement('input')
			divId.placeholder = 'ID'
			divId.value = usuario.id
			divUsuario.appendChild(divId)

			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Username'
			divNome.value = usuario.username
			divUsuario.appendChild(divNome)
			
			// //pega o email do usuario
			// let divEmail = document.createElement('input')
			// divEmail.placeholder = 'Email'
			// divEmail.value = usuario.email
			// divUsuario.appendChild(divEmail)
			
			// //pega o cpf do usuario
			// let divCpf = document.createElement('input')
			// divCpf.placeholder = 'CPF'
			// divCpf.value = usuario.cpf
			// divUsuario.appendChild(divCpf)
			
			// //cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(usuario.id)
			btnRemover.style.marginRight = '5px'
			
			// //cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(usuario.id, divNome)
			btnAtualizar.style.marginLeft = '5px'
			
			// //cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaUsuarios.appendChild(divUsuario)
		}
	})
}

function atualizar(id, divNome)
{
	let body =
	{
		"id": id,
		'Username': divNome.value,
	}
	
	fetch(url + "User/UpdateUser",
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o usuário :/')
	})
}

function remover(id)
{
	fetch(url + 'User/RemoveUser?id=' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o usuário :/')
	})
}

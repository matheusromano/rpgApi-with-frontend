var url = 'https://localhost:7248/'

function cadastrar()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'char_name' : document.getElementById('char_name').value,
		'char_class' : document.getElementById('char_class').value,
		'user_id' : document.getElementById('user_id').value

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
	request.open("POST", url + "api/Character/AddCharacter")
	request.setRequestHeader('Accept', 'application/json')
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(body))
}

function listar()
{
	//da um GET no endpoint "usuarios"
		fetch(url + 'api/Character/ListAllCharacters')
	.then(response => response.json())
	.then((characters) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaCharacters = document.getElementById('lista-characters')
		
		//limpa div
		while(listaCharacters.firstChild)
		{
			listaCharacters.removeChild(listaCharacters.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let character of characters)
		{
			//cria div para as informacoes de um usuario
			let divUsuario = document.createElement('div')
			divUsuario.setAttribute('class', 'form')
			
			// //pega o id do usuario
			let divId = document.createElement('input')
			divId.placeholder = 'ID'
			divId.value = character.id
			divUsuario.appendChild(divId)

			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Username'
			divNome.value = character.name
			divUsuario.appendChild(divNome)

			let divClass = document.createElement('input')
			divClass.placeholder = 'Class'
			divClass.value = character.rpgClass
			divUsuario.appendChild(divClass)

			let divUserId = document.createElement('input')
			divUserId.placeholder = 'User ID'
			divUserId.value = character.userId
			divUsuario.appendChild(divUserId)
			
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
			btnRemover.onclick = u => remover(character.id)
			btnRemover.style.marginRight = '5px'
			
			// //cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(character.id, divNome, divRpgClass, divUserId)
			btnAtualizar.style.marginLeft = '5px'
			
			// //cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaCharacters.appendChild(divUsuario)
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

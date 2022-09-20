var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var criaMosquitoTempo = 1500

// recuperar os parâmetros de dificuldade enviados para a página
var nivel = window.location.search // search diferente de href, retorna apenas oq foi enviado após o ponto de interrogacao
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	var criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
	var criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	var criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){ // função utilizada com o onresize no body para sempre variar a altura e a largura conforme a página for redimensionada
	altura = window.innerHeight // encontrar altura e largura da página, para delimitar a área que os mosquitos aparecerão
	largura = window.innerWidth
}

ajustaTamanhoPalcoJogo()

// Criando um cronometro para decrementar o tempo do jogo 
var cronometro = setInterval( 
	function(){

		tempo -= 1

		if(tempo <0){ // Será vitória
			clearInterval(cronometro) // fazendo com que o cronometro pare após a vitória
			clearInterval(criaMosquito)
			window.location.href = 'vitoria.html'
		} else {
		document.getElementById('cronometro').innerHTML = tempo // atributo innerHTML que confere tudo que está dentre as tags de abre e fecha do elemento
		}

	}, 1000)

function posicaoRandomica(){ 
	
	// removendo mosquito anterior (caso exista)
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		if (vidas > 3){
			window.location.href = 'game_over.html'
		} else {
			document.getElementById('v' + vidas ).src = "imagens/coracao_vazio.png" // controlando os pontos de vida
			vidas++
		}
	}


	// Criando posições randomicas p/ o mosquito

	var posicaoX = Math.floor(Math.random() * largura) - 90 // math.floor para retirar as casas decimais, math.random p/ randomizar um numero e a multiplicacao pela variavel altura/ largura, para criar um valor entre esses intervalos
	var posicaoY = Math.floor(Math.random() * altura) - 90 // -90 para evitar que o tamanho da imagem ultrapasse o tamanho gerado randomicamente e estoure a area

	// verificando se posicao X e Y é menor que 0, se for, X e Y recebera o valor de 0, podendo evitar que o mosquito desapareca do campo de visao da tela
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	// criar o elemento HTML de forma programática através da API do DOM

	var mosquito = document.createElement('img') // criando a imagem e atribuindo ela à variável mosquito
	mosquito.src = 'imagens/mosca.png' // Acessando os atributos do elemento mosquito, atribuindo um valor(imagem) para o elemento html src 
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() // Atribuindo a classe CSS gerada de forma randomica para o mosquito
	mosquito.style.left = posicaoX + 'px' // Atribuindo a coordenada em px ao mosquito à esquerda do navegador
	mosquito.style.top = posicaoY + 'px' // Atribuindo a coordenada em px ao mosquito em relação ao topo do navegador
	mosquito.style.position = 'absolute' // Para as coordenadas serem aplicadas o elemento deve ser absoluto 
	mosquito.id = 'mosquito'
	mosquito.onclick = function (){
		this.remove()
	}
	document.body.appendChild(mosquito) // adicionando o mosquito ao body da página

	
}

// Criando tamanhos aleatórios para o mosquito

function tamanhoAleatorio(){

	var classe = Math.floor(Math.random() * 3) // para criar um valor aleatório de 0 a 3

	switch(classe){

		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}

}

// Criando lados aleatórios para os mosquitos

function ladoAleatorio(){

	var classe = Math.floor(Math.random() * 2) // para criar um valor aleatório de 0 a 2

	switch(classe){

		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}

}
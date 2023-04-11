class Produto {
  constructor() {
    this.posiçao_lista = 1
    this.arrayProdutos = []
    this.edititem = null
  }

  adicionar() {
    //2º
    let produto = this.lerDados()

    let table = document.querySelector('div.content').style.display='block';

    if (this.validarCampos(produto) == true) {
      //// aqui eu chamo a função validarCampos() e coloco a variavel produto para ela validar, até pq o conteudo que está dentro dessa variavel é o objeto dados_produto que é o parametro que ela precisa para funcionar.
      //Se a validação retornar true, será verificado o edititem. Se o edititem for null, será chamado o metodo adicionarAlista() para adicionar à lista o conteudo verificado da variavel produto. Se o edititem for diferente de null, sera chamado o metodo atualizar usando como parametro para esse metodo o edititem

      if (this.edititem == null) {
        // se a variavel edititem for null, será chamado o metodo adicionarAlista() para adicionar os valores na lista
        this.adicionarAlista(produto)
      } else {
        //se a variavel edititem for diferente de null, será chamado o metodo atualizar() para que seja alterado os valores que o usuario escolheu alterar
        this.atualizar(this.edititem, produto) // será passado o edititem como parametro para ser usado seu novo valor posiçao_lista para poder ser usado como localizador pelo metodo atualizar para poder ser encontrado o determinado lugar da lista para ser atualizada. E tambem o produto para que os valores dentro de seu object possam ser acessados
      }
    }
    this.listaTabela()

    document.getElementById('produto').value = ''
    document.getElementById('marca').value = ''
    document.getElementById('quantidade').value = ''
  }

  listaTabela() {
    //5°
    //Esse metodo serve para listar os dadoos que tem dentro do array e criar uma tabela com eles
    let tbody = document.getElementById('tbody')
    tbody.innerText = '' // Isso serve para esvaziar a tabela dos dados que acabaram de serem prenchidos(com exceção da parte da tabela que ja foi prenchida). Isso serve para não vir dados repetidos. Obs: to falando da tabela e não dos campos de texto

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      //o for esta sendo usado para acessarmos o nosso array, percorrendo todos os elementos que tem dentro dele

      let tr = tbody.insertRow() //insertRow() é uma função que adiciona linhas na tabela

      let td_nomeProduto = tr.insertCell() //insertCell() é uma função que insere uma célula na linha da tabela
      let td_marca = tr.insertCell()
      let td_quantidade = tr.insertCell()
      let td_botoes = tr.insertCell()

      td_nomeProduto.innerText = this.arrayProdutos[i].nomeProduto //aqui está sendo declarado que a celula que a variavel td_nomeProduto armazena será preenchida com o texto que mostra o conteudo armazenado no arrayProdutos na posição [i] desse array no topico nomeProduto que está dentro do object que esta dentro da posição [i] desse array. E o mesmo modelo vale para os outros a seguir.
      td_marca.innerText = this.arrayProdutos[i].marca
      td_quantidade.innerText = this.arrayProdutos[i].quantidade

      td_nomeProduto.classList.add('center') //classList.add('nome da classe') adiciona uma clase ao elemento
      td_marca.classList.add('center')
      td_quantidade.classList.add('center')

      let imgedit = document.createElement('img')
      imgedit.src = 'img/escrever.png' // .src serve para adicionar o endereço ao elemento, no caso, endereço de imagem
      imgedit.setAttribute(
        'onclick',
        'produto.editar(' + JSON.stringify(this.arrayProdutos[i]) + ')' //os dados irão ser passados para o html atraves de um JSON. Será mandado todo o array convertido em string para o html para podermos receber todos os dados e por isso será usado o .stringify() que converte valores em javascript para uma String JSON. Esses valores podem ser substituidos especificando a função replacer, ou incluindo somente as propriedades específicas, quando o array do replacer for especificado. Ao fazer isso os dados serão passados também para o metodo editar()
      )
      imgedit.setAttribute('class','icones');
      

      let imgchecked = document.createElement('img')
      imgchecked.src = 'img/check-in-quadrangular.png'
      imgchecked.setAttribute(
        'onclick',
        'produto.comprado(' + this.arrayProdutos[i].posiçao_lista + ')'
      )
      imgchecked.setAttribute('class','icones');

      td_botoes.appendChild(imgedit)
      td_botoes.appendChild(imgchecked)

      console.log(this.arrayProdutos)
    }
  }

  adicionarAlista(produto) {
    // 4º
    //Esse metodo adicina o elemento produto que contem os dados novos no object dados_produto para dentro do array arrayProdutos
    this.arrayProdutos.push(produto)
    this.posiçao_lista++
  }

  atualizar(posiçao_lista, produto) {
    //8°
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].posiçao_lista == posiçao_lista) {
        //será percorrido o array para encontrar um posiçao_lista que seje igual ao posiçao_lista que está no parametro que está tambem dentro da variavel edititem. Se for encontrado, o object onde esta esse arrayProdutos terá os valores de seus topicos alterados pelos novos valores que o usuario digitou

        this.arrayProdutos[i].nomeProduto = produto.nomeProduto // na posição da lista que for igual a posiçao_lista, no topico nomeProduto dentro do object, receberá a partir de agora o novo valor nomeProduto que foi adicionado no object dados_produto que está dentro da variavel produto que é inclusive o parametro desse metodo. e o mesmo vale para as duas linhas abaixo com seu respectivos topicos
        this.arrayProdutos[i].marca = produto.marca
        this.arrayProdutos[i].quantidade = produto.quantidade

        document.getElementById('btn1').innerText = 'Adicionar' // o botao voltará a ter o texto "Adicionar" escrito dentro dele
        this.edititem = null //e o edititem voltará a valer null
      }
    }
  }

  editar(dados) {
    //7°
    //dados é o nome que foi dado para o array ao ser enviado para esse metodo atraves do JSON.stringify()
    this.edititem = dados.posiçao_lista // ao ser usado o metodo editar(), será atribido dentro da variavel edititem o valor posiçao_lista fazendo com que assim, edititem deixe de ser null e passe a ter algum valor, chamando assim lá dentro do metodo adicionar() o metodo atualizar()

    document.getElementById('produto').value = dados.nomeProduto // com isso o valor que estiver nos dados dentro do topico nomeProduto será devolvido para o campo texto/input produto para poder ser alterado se for a vontade do usuario. o q acontece nessa linha, tambem acontece com as duas de baixo mas com os valores e topicos e campos textos delas
    document.getElementById('marca').value = dados.marca
    document.getElementById('quantidade').value = dados.quantidade

    document.getElementById('btn1').innerText = 'Atualizar' // aqui está sendo mudado o texto do botao btn1, que até apertar o botão de editar ele terá escrito dentro dele: 'Adicionar', e após apertar o botão editar, estará escrito dentro dele o 'Atualizar'.
  }

  lerDados() {
    //1º
    /* esse metodo irá ler os campos e mandar para o metodo salvar() */
    let dados_produto = {}

    dados_produto.posiçao_lista = this.posiçao_lista //Desse jeito estou criando dentro do object o topico posição_lista e quardando dentro desse topico o nº de identificação de cada object que servirá como n° de identificação de itens da lista para que depois eu possa manipular o esses objects/itensdalista

    dados_produto.nomeProduto = document.getElementById('produto').value //Desse jeito estou criando os topicos do object dados_produto e adicionando valores a ele. Nesse 1º caso estou criando o topico nomeProduto e preenchendo ele com o valor do input para por o nome do produto
    dados_produto.marca = document.getElementById('marca').value
    dados_produto.quantidade = document.getElementById('quantidade').value

    return dados_produto
  }

  validarCampos(dados_produto) {
    //3º
    //Esse metodo serve para conferir se os inputs que se referem ao nome do produto e a quantidade estão preenchidos ou não
    let msg = ''

    if (dados_produto.nomeProduto == '') {
      msg += '- Informe o Nome do Produto \n'
    }

    if (dados_produto.quantidade == '') {
      msg += '- Informe a quantidade do Produto \n'
    }

    if (dados_produto.quantidade < 0) {
      msg +=
        'O valor da quantidade não está definido da maneira correta! verifique novamente para  poder adicionar a lista'
    }

    if (msg != '') {
      alert(msg)
      return false //por retornar como false, essa validação será devolvida ao adicionar que será recebido dentro de uma variavel
    }

    return true
  }

  comprado(posiçao_lista) {
    //6°
    if (
      confirm('Deseja realmente tirar o produto' + posiçao_lista + 'da lista?')
    ) {
      // ao clicar no botão de comprado(checked) será aberto uma janela de confirmação para confirmar se deseja tirar o determinado produto da lista. Se o usuario confirmar, o programa seguirá em frente e eliminará o produto da lista
      let tbody = document.getElementById('tbody')
      //será necessario percorrer os itens do array para encontrar o posiçao_lista dentro dele  que o valor seje igual ao valor do posiçao_lista recebido nessa função como parametro, para que assim possa ser apagado o object inteiro que esta nessa lista que contenha esse valor do posiçao_lista
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].posiçao_lista == posiçao_lista) {
          this.arrayProdutos.splice(i, 1) //O método splice() é um método incorporado para objetos de array em JavaScript. Ele permite alterar o conteúdo do seu array removendo ou substituindo elementos existentes por novos elementos. funciona da seguinte maneira: .splice(numerodeidentificaçãodolugardoarrayquevaiseralterado, quantoselementosvãoseralterados, opcional:valorqueficaranoligardesseitems)
          tbody.deleteRow(i) //O metodo .deleteRow é uma metodo que deleta linhas. Ou seja; será deletado o a linha onde estive esse (i)
        }
      }
      console.log(this.arrayProdutos)
    }
  }
}

var produto = new Produto()

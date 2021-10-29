

//Criando a função de construção do HTML com os dados da API(que no caso é um objeto, simulando uma API)
let response = (id,imagem, preco, descricao, nome) =>{
  //Definindo o evento onclick na tag <a>, sendo passado como argumento os values de cada objeto
  document.querySelector('.pizza-area').innerHTML+= 
            `<div class='pizza-item'>
                <a href='#' onclick="monstrarWindowPizza('${imagem}','${descricao}', '${nome}',${preco})">
                    <img class='pizza-item--img' src="${imagem}" />
                    <div class='pizza-item--add'>+</div>
                </a>
                <div class='pizza-item--name'>${nome}</div>
                <div class='pizza-item--price'>R$ ${preco}</div>
                <div class='pizza-item--desc'>${descricao}</div>
            </div>`
} 

//POuplando o index com as pizzas
pizzaJson.forEach((obj)=>{
    response(obj.id, obj.img, obj.price, obj.description, obj.name)
})

//Pegando os values passados como argumento na construção do HTML, para exibi-los quando clicar na pizza
const monstrarWindowPizza = (imagem, descricao, nome, preco) => {
    document.querySelector('.pizzaWindowArea').style.display = 'flex'
    document.querySelector('.imagem-window').setAttribute('src', imagem)
    document.querySelector('.pizzaInfo--desc').innerHTML = descricao
    document.querySelector('.pizza_name').innerHTML = nome
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = preco
}

//Função para fechar a window
const fecharWindow = () => {
    document.querySelector('.pizzaWindowArea').style.display = 'none'
}

let i = 1
let controllerButton = 0
let controllerDiv
let controllerCart = 0
let subTotal = 0
let desconto = 0
let total = 0
//Adicionar ao carrinho de compra
const adicionarCarrinho = () => {
    controllerButton++
    controllerCart++
    controllerDiv = `control${controllerButton}`
    document.querySelector('.pizzaWindowArea').style.display = 'none'
    document.querySelector('.aside').style.width = '30vw'

    const img = document.querySelector('.imagem-window').getAttribute('src')
    const nome = document.querySelector('.pizza_name').innerHTML
    const qnt =  document.querySelector('.pizzaInfo--qt').innerHTML
    const preco =  document.querySelector('.pizzaInfo--actualPrice').innerHTML

    //Matematica do carrinho
    subTotal += parseFloat(preco) * parseFloat(qnt)
    desconto = subTotal * 0.1
    total = subTotal - desconto
    document.querySelector('.subtotal_text').innerHTML = `R$ ${subTotal.toFixed(1)}`
    document.querySelector('.desconto_text').innerHTML = `R$ ${desconto.toFixed(1)}`
    document.querySelector('.total_text').innerHTML = `R$ ${total.toFixed(1)}`


    document.querySelector('.cart').innerHTML += 
                `<div id='${controllerDiv}' class="cart--item">
                    <img src="${img}" />
                    <div class="cart--item-nome">${nome}</div>
                        <div class="cart--item--qtarea">
                            <button class="cart--item-qtmenos" onclick="subPizzaCart(${controllerButton},'${controllerDiv}',${preco})">-</button>
                            <div id='${controllerButton}' class="cart--item--qt">${qnt}</div>
                            <button class="cart--item-qtmais" onclick="addPizzaCart(${controllerButton},${preco})">+</button> 
                        </div>
                    </div>
                </div>`
    i = 1
    document.querySelector('.pizzaInfo--qt').innerHTML = i

}



//Window buttons add e sub

const addPizza = () =>{
    i++
    document.querySelector('.pizzaInfo--qt').innerHTML = i
}

const subPizza = () =>{
    i--
    if (i <=0) {
        i =1
    }
    document.querySelector('.pizzaInfo--qt').innerHTML = i
}


//Chart Buttons add e sub

const addPizzaCart = (controllerButton, preco) =>{
    let y = document.getElementById(`${controllerButton}`).innerHTML
    y++

   //Matematica do carrinho
   subTotal += parseFloat(preco)
   desconto = subTotal * 0.1
   total = subTotal - desconto
   document.querySelector('.subtotal_text').innerHTML = `R$ ${subTotal.toFixed(1)}`
   document.querySelector('.desconto_text').innerHTML = `R$ ${desconto.toFixed(1)}`
   document.querySelector('.total_text').innerHTML = `R$ ${total.toFixed(1)}`

   document.getElementById(`${controllerButton}`).innerHTML = y
}

const subPizzaCart = (controllerButton, controllerDiv, preco) =>{
    let y = document.getElementById(`${controllerButton}`).innerHTML
    y--

    //Matematica do carrinho
    subTotal -= parseFloat(preco)
    desconto = subTotal * 0.1
    total = subTotal - desconto
    document.querySelector('.subtotal_text').innerHTML = `R$ ${subTotal.toFixed(1)}`
    document.querySelector('.desconto_text').innerHTML = `R$ ${desconto.toFixed(1)}`
    document.querySelector('.total_text').innerHTML = `R$ ${total.toFixed(1)}`
    
    
    if (y <= 0) {
        y =0
        controllerCart--
        document.getElementById(controllerDiv).remove()
        
        if(controllerCart == 0){
            
           document.querySelector('.aside').style.width = '0vw' 
        }
    }
    
    
    if(y > 0){
        document.getElementById(`${controllerButton}`).innerHTML = y
    }
 
}

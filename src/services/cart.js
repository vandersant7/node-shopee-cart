// Quais ações meu carrinho pode fazer?

// -> adicionar item do carrinho
async function addItem(userCart, item){
    userCart.push(item)
}

// -> deletar item do carrinho
async function deleteItem(userCart, name){
    const index = userCart.findIndex((item) => item.name === name)

    if(index !== -1){
        userCart.splice(index, 1)
    }
}


// -> remover um item: diminuir um item
async function removeItem(userCart, item){

    //1. encontrar o indice do item
    const indexFound = userCart.findIndex((p) => p.name === item.name)
    
    //2. caso não encontre o item
    if(indexFound === -1){
        console.log("item não encontrado")
        return
    }

    //3.item > 1? subtrair um item
    if(userCart[indexFound].quantity > 1){
        userCart[indexFound].quantity -= 1
        return
    }

    //Obs.: O return é especialmente útil para evitar que duas condições if sejam executadas simultaneamente.

    //4. deletar o item
    if(userCart[indexFound].quantity == 1){
        userCart.splice(indexFound, 1)
    }
}

// -> calcular o total do carrinho
async function calculateTotal(userCart){
    console.log('\nShopee Cart IS: ')
    
    const result = userCart.reduce((total, item) => total + item.subtotal(), 0)
    console.log(`\nTotal: 🛒${result}`)
}

// -> mostrar os itens do carrinho
async function displayCart(userCart) {
    console.log("Shopee cart list: ")
    userCart.forEach((item, index) => {
        console.log(`${index + 1}.${item.name} - R$ ${item.price} | Qtd. ${item.quantity} | Subtotal ${item.subtotal()}`)
    })
}

async function calculateShippingRates(userCart){
    const shippingRates = 30.29
    const result = userCart.reduce((total, item) => total + item.subtotal(), 0)

    if(result >= 150) {
        console.log(`\nParabéns! Você ganhou frete grátis. O valor total a pagar é: ${result}`)
        return
    }

    if(result < 150) {
        console.log(`\nFalta pouco para você ganhar frete grátis. 
        \nAdicione mais ${(150 - result).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} em produtos para ganhar frete grátis.
        \nO valor total a pagar é: ${(result + shippingRates).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`)
        return
    }


}

export {
    addItem, 
    calculateTotal,
    deleteItem,
    removeItem,
    displayCart,
    calculateShippingRates
}
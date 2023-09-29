import data from './data.js'

const itemsContainer = document.querySelector('#items')
const itemsList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

for(let i = 0; i < data.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item'
    
    const img = document.createElement('img');
    
    img.src = data[i].image
    img.width = 300
    img.height = 300

    newDiv.appendChild(img)
    
    itemsContainer.appendChild

    const desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)

    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    const button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    
    newDiv.appendChild(button)

    itemsContainer.appendChild(newDiv)



    const cart = [ ]

    // add item
    function addItem(name, price) {
        for (let i = 0; i < cart.length; i += 1 ) {
            if (cart[i].name === name) {
                cart[i].qty += 1
                cart[i].total = cart[i].qty * price;
                showItems()
                return
            }
        }
        const item = {name, price, qty: 1, total: price}
        cart.push(item)
        showItems()
    }
    // show itmes 
    function showItems() {
        let itemStr = ''
        const qty = getQty()
        cartQty.innerHTML = `You have ${qty} items in your cart`
            
        for (let i = 0; i < cart.length; i += 1) {
            const {name, price, qty} = cart[i]

            itemStr += `<li> 
            ${name} $${price} x ${qty} = ${qty * price}
            <button class = "remove" data-name="${name}">Remove</button>
            <button class = "add-one" data-name="${name}"> + </button>
            <button class = "remove-one" data-name="${name}"> - </button>
            <input class = "update" type="number" data-name = ${name}>
            </li>`
            
        }
        itemsList.innerHTML = itemStr

        //console.log(`Total in cart $${getTotal()}`)
        cartTotal.innerHTML = `Total in cart $${getTotal()}`
    }

    //all items button
    const all_items_button = Array.from(document.querySelectorAll("button"))

    all_items_button.forEach(elt => elt.addEventListener('click', () => {
        addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
        showItems()
    }))

    // get qty
    function getQty() {
        let qty = 0
        for (let i = 0; i < cart.length; i +=1) {
            qty += cart[i].qty
        }
        return qty 
    }

    // get total
    function getTotal() {
        let total = 0
        for (let i = 0; i < cart.length; i += 1) {
            total += cart[i].price * cart[i].qty
        }
        return total.toFixed(2)
    }

    // remove item
    function removeItem(name, qty =0) {
        for (let i = 0; i < cart.length; i += 1) {
            if (cart[i].name === name) {
                if (qty > 0) {
                    cart[i].qty -= qty
                }
                if (cart[i].qty < 1 || qty == 0) {
                   cart.splice(i, 1)
                }
                showItems()
                return
            }

        }

    }
    // handle change events on update input
    itemsList.onchange = function(e) {
        if (e.target && e.target.classList.contains('update')) {
            //console.log(e.target)
            const name = e.target.dataset.name
            const qty = parseInt(e.target.value)
            updateCart(name, qty)

        }
    }

    // update cart 
    function updateCart(name,qty) {
        for (let i = 0; i < cart.length; i +=1) {
            if (cart[i].name === name) {
                if (qty <= 0) {
                    removeItem(name)
                    return
                }
                cart[i].qty = qty
                cart[i].total = qty * cart[i].price;
                showItems()
                return
            }
        }
    }
    // handling clicks 
    itemsList.onclick = function(e) {
        if (e.target && e.target.classList.contains('remove')) {
            const itemName = e.target.dataset.name 
            removeItem(itemName)
        } else if (e.target && e.target.classList.contains('add-one')) {
            const itemName = e.target.dataset.name
            addItem(itemName)
        } else if(e.target && e.target.classList.contains('remove-one')) {
            const itemName = e.target.dataset.name
            removeItem(itemName)
        }
        return
        showItems()
    }


}



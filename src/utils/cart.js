import { image } from "motion/react-client";

export function getCart(){
    let cartInString = localStorage.getItem('cart'); 
    if(cartInString==null){
        cartInString="[]"
        localStorage.setItem('cart',cartInString)
    }

    const cart = JSON.parse(cartInString)
    return cart
}

export function addToCart(product,qty){
    const cart = getCart()
    const existingProduct = cart.findIndex(
        (item)=>{
            return item.productId === product.productId
        }
    )
    
    if(existingProduct==-1){
        cart.push(
            {
                productId:product.productId,
                quantity:qty,
                price:product.price,
                name:product.productName,
                altNames:product.altNames,
                image:product.images[0]
            }
        )
        localStorage.setItem('cart',JSON.stringify(cart))
    }else{
        const newQty = cart [existingProduct].quantity+qty

        if(newQty<=0){
            const newCart = cart.filter((item,index)=>{
                return index !== existingProduct
            })
        
            localStorage.setItem('cart',JSON.stringify(newCart))
        }else{
            cart[existingProduct].quantity= newQty
            localStorage.setItem('cart',JSON.stringify(cart))
        }
    }
}

export function getTotal(){
    const cart = getCart();
    let total =0;

     cart.forEach((item)=>{
        total+= item.quantity*item.price;

     })
     return total;
}
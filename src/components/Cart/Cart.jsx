import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';
import { useReducer } from 'react';

export function Cart()
{
    
    const {itemsInCart} = useCart();

    const [state, dispatch] = useReducer(quantityReducer,itemsInCart);

    function quantityReducer(state, action){
        switch (action.type){
            case 'DECREMENT':
                console.log({state},{action})
                 return state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity - 1} :  item)
            // case 'INCREMENT':
            //     console.log({state},{action})
            //     return {...state, itemsInCart : state.itemsInCart.map(item => item.id === action.payload.id ? {...item, quantity : item.quantity + 1 } : item)}
            
            default:
                return state;
        }
    }
    console.log({itemsInCart})
    return (
        <div> 
            {state.map(item => {
            return (
                <div className="cart-item" key={item.id}>

                    <img src={item.productImage} alt='image' className="cart-item-image" />
                    <div className="cart-item-details">
                        <div> {item.productName} </div>
                        <div className="quantity-setter">
                            <button className="quantity-setter-button" onClick={()=>dispatch({type: 'DECREMENT', payload: item})}>-</button> 
                                    {item.quantity} 
                            <button className="quantity-setter-button" onClick={()=>dispatch({type: 'INCREMENT', payload: item})}>+</button>
                        </div>
                    </div>
                    <div> ₹ {item.price * item.quantity} </div>
                    
                </div>
            );
        })}
        </div>
)}
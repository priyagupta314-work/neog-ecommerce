import React from 'react';
import  faker   from 'faker';
import './Products.css';
import { useReducer } from 'react';
import { useCart } from '../../contexts/CartContext';

export default function Products(){

    // const name = faker.address.city();
    //console.log({name});
    const data = [...Array(50)].map(item => ({
        id : faker.random.uuid(),
        productName : faker.commerce.productName(),
        productImage : faker.image.image(),
        inStock : faker.datatype.boolean(),
        fastDelivery : faker.datatype.boolean(),
        price : faker.commerce.price()
    }));
    console.log(data);
    faker.seed(123);


    const {setItemsInCart} = useCart();
    
    function productReducer(state,action){
        console.log({state})
        switch(action.type){
            case 'SHOW_INVENTORY_ALL':
                return { ...state , includeOutOfStock : !state.includeOutOfStock}
            case 'FAST_DELIVERY_':
                return { ...state , fastDelivery : !state.fastDelivery}
            case 'SORT':
                if (action.payload === 'LOW_TO_HIGH'){
                    return {...state, sortBy : 'low_to_high'}
                }   return {...state, sortBy : 'high_to_low'}
                

        }
    }

    
    const [{includeOutOfStock , fastDelivery, sortBy}, dispatch] = useReducer(productReducer, {includeOutOfStock : false , fastDelivery : false , sortBy : null});

    function getSortedData(sortBy,data){
        if (sortBy === 'low_to_high'){
            return data.sort((a,b) => a['price'] - b['price'])
        }
        else if(sortBy === 'high_to_low'){
            return data.sort((a,b) => b['price'] - a['price'])
        }
        return data;
    }


    function getFilteredData(sortedData, includeOutOfStock , fastDelivery){
        
            return sortedData.filter(product => includeOutOfStock ? true : product.inStock )
                        .filter(product => fastDelivery ? product.fastDelivery : true)
        
    }



    const sortedData = getSortedData(sortBy,data);
    const filteredData = getFilteredData(sortedData, includeOutOfStock , fastDelivery);
    
    
    return (
        <div className="products-listing-page">
            <div className="vertical-filters">
                <fieldset>
                    <div> FILTER BY </div>
                    <br/>
                    <div className="filter-options">
                    <label><input type="checkbox" name="filter-options" checked={includeOutOfStock} onClick={()=>dispatch({ type: 'SHOW_INVENTORY_ALL'}) } />  Include Out Of Stock </label>
                    <label><input type="checkbox" name="filter-options" checked={fastDelivery} onClick={()=>dispatch({type : 'FAST_DELIVERY_'})} />  Show Fast Delivery only  </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div> SORT BY </div>
                    <br/>
                    <div className="filter-options">
                    <label><input type="radio" name="sort-options" onChange={() => dispatch({type: 'SORT' , payload : 'LOW_TO_HIGH'})}/>  Price Low to High </label>
                    <label><input type="radio" name="sort-options" onChange={() => dispatch({type: 'SORT' , payload : 'HIGH_TO_LOW'})}/>  Price High to Low </label>
                    
                    </div>
                </fieldset>
                
            </div>
            <div className="products">
            { filteredData.map ((item)  => 
                (
                    <div key={item.id} className="product-card">
                        <img style = {!item.inStock ? {opacity : 0.4 } : {opacity : 1} } src={item.productImage} />
                        <div> {item.productName} </div>
                        <div> ₹ {item.price} </div>
                        <div> {item.inStock} </div>
                         { item.fastDelivery && item.inStock && <div className="fast-delivery" title="Fast Delivery"> <i class="fas fa-tag"></i>   {item.fastDelivery} </div> }
                         { !item.inStock && <div class="out-of-stock"> OUT OF STOCK </div> }
                         <div className="add-buttons">
                         { item.inStock && <button className= "btn btn-primary" onClick = {()=>setItemsInCart(items=> [...items, {...item, quantity : 1}])} > Add to Cart </button> }
                            <button className="btn btn-secondary" > <i class="fas fa-heart"></i> Wishlist </button>
                            
                        </div>
                        
                    </div>
                )
            )}
            </div>
        </div>
        
    )
}
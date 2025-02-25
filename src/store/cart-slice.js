import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        itemsList: [],
         totalQuantity: 0, 
         showCart: false,
         changed: false
        },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.itemsList = action.payload.itemsList;
        },
        addToCart(state, action) {
            state.changed = true;
             const newItem = action.payload;
             const existingItem = state.itemsList.find(item => item.id === newItem.id);

             if(existingItem) {
                    existingItem.quantity++;
                    existingItem.totalPrice += newItem.price;
             } else {
                    state.itemsList.push({
                        id: newItem.id,
                        price: newItem.price,
                        quantity: 1,
                        name: newItem.name,
                        totalPrice: newItem.price
                    });

                    state.totalQuantity++;
                }
        },
        removeFromCart(state, action) {
            state.changed = true;
            const id = action.payload;
            const existingItem = state.itemsList.find(item => item.id === id);
            if(existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            
        },
        setShowCart(state, action) {
            state.showCart = !state.showCart;
        }

    },
});



export const cartActions = cartSlice.actions;

export default cartSlice;
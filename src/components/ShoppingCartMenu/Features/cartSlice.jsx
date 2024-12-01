import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmountL: 0,
};

const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers:{

        // thêm sản phẩm
        addToCart(state, action){
            const existingIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if(existingIndex >= 0){
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
                }
                toast.info(`increased ${state.cartItems[existingIndex].title} cart quantity`, {
                    position: "bottom-left",
                });
            } else {
            let tempProductItem = { ...action.payload, cartQuantity: 1 }
            state.cartItems.push(tempProductItem);
            toast.success(`${action.payload.title} added to cart`, {
                position: "bottom-right",
            });
            }

            state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + item.price * item.cartQuantity,
                0
            );

            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
    //    xóa sản phẩm này khỏi giỏ hàng
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if(cartItem.id === action.payload.id){
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );
                    state.cartItems = nextCartItems;
                    toast.error(`${action.payload.title} removed from cart`, {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
        },
// bớt đi một số lượng hàng
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.title} cart quantity`, {
                    position: "bottom-left",
                });
            } else if(state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.title} removed from cart`, {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
// xóa toàn bộ hàng đã thêm
        clearCart(state, action){
            state.cartItems = [];
            toast.error(`Cart cleared`, {
                position: "bottom-left",
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
// lấy tổng sản phẩm và tổng tiền
        getTotals(state, action){
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
            },
            {
                total: 0,
                quantity: 0,
            });
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
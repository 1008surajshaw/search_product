import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Item {
    id:string;
}

export const WishlistSlice = createSlice({
    name:"wishlist",
    initialState:[] as Item[],
    reducers :{
        add:(state,action:PayloadAction<Item>) =>{
            state.push(action.payload )
        },
        remove:(state,action: PayloadAction<string>) =>{
            return state.filter((item) =>item.id !== action.payload)
        }
    }
})

export const {add,remove} = WishlistSlice.actions;
export default WishlistSlice.reducer;
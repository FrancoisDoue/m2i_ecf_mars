import { configureStore } from "@reduxjs/toolkit";
import pokeSlice from "./slices/pokeSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        pokemon: pokeSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
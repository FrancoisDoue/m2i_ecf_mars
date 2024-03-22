import { configureStore } from "@reduxjs/toolkit";
import pokeSlice from "./slices/pokeSlice";
import userSlice from "./slices/userSlice";
import pokeFilterSlice from "./slices/pokeFilterSlice";

export default configureStore({
    reducer: {
        pokemon: pokeSlice,
        user: userSlice,
        pokeFilter: pokeFilterSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {pokemonsSlice} from "./slices/pokemonsSlice";
import { FormSlice } from "./slices/FormSlice";

export const store=configureStore({
    reducer:{
        pokemonStore:pokemonsSlice.reducer,
        // PokemonSlice: PokemonSlice.reducer,
        FormSlice: FormSlice.reducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
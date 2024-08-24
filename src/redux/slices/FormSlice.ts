import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IFormInfo} from "../../models/IFormInfo";

import {AxiosError} from "axios";
import { pokemonsService } from "../../services/api.service";

type FormSliceType = {
    form: IFormInfo
}

const initFormSlice: FormSliceType = {
    form: {
        id: 0,
        name: '',
        is_mega: false,
        is_battle_only: false,
        is_default: false,
        sprites: {
            back_shiny: '',
            front_shiny: ''
        },
        version_group: {
            name: ''
        }
    }
}

const loadForm = createAsyncThunk  ('FormSlice/loadForm', async (id:string, thunkAPI) => {
    try {
        const form = await pokemonsService.getFormInfo(id)
        return thunkAPI.fulfillWithValue(form)
    }catch (e){
        const error = e as AxiosError
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})


export const FormSlice = createSlice({
    name: 'FormSlice',
    initialState: initFormSlice,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadForm.fulfilled, (state, action) => {
                state.form = action.payload
            })
})

export const formAction = {
    ...FormSlice,
    loadForm
}
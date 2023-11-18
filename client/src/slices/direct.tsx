import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface directState {
    step: number;
    title: string,
    description: string,
    category: string,
    question1: string,
    question2: string,
    question2_chk: number,
    question3: number,
    
}

const initialState: directState = {
    step: 0,
    title:'',
    description:'',
    category:'',
    question1: '',
    question2: '',
    question2_chk: 4,
    question3: 4
}

const directSlice = createSlice({
    name: "direct",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload.step;
        },
        setCategory:(state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.category = action.payload.category;
        },
        setQuestion: (state, action) => {
            state.question1 = action.payload.question1;
            state.question2 = action.payload.question2;
            state.question2_chk = action.payload.question2_chk;
            state.question3 = action.payload.question3;
        },
        setInit: () => initialState,
    },
});

export const { setStep, setCategory, setQuestion, setInit } = directSlice.actions;
export default directSlice.reducer;
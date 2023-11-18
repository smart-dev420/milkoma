import { createSlice } from "@reduxjs/toolkit";

interface creatorState {
    contracted: boolean;
    contractCheck: boolean;
}

const initialState: creatorState = {
    contracted: false,
    contractCheck: false,
}

const contractSlice = createSlice({
    name: "contract",
    initialState,
    reducers: {
        setContract: (state, action) => {
            state.contracted = action.payload.contracted;
        },
        setContractCheck: (state, action) => {
            state.contractCheck = action.payload.contractCheck;
        },
        setInit: () => initialState,
    },
});

export const { setContract, setContractCheck, setInit } = contractSlice.actions;
export default contractSlice.reducer;
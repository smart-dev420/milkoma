import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import creatorReducer from './slices/creator';
import directReducer from './slices/direct';
import pageReducer from './slices/page'
import contractReducer from './slices/contract';
const reducer = {
  auth      : authReducer,
  message   : messageReducer,
  direct    : directReducer,
  creator   : creatorReducer,
  pages     : pageReducer,
  contract  : contractReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
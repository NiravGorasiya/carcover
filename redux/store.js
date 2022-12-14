import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/main";

const store = createStore(rootReducer)

export const wrapper = createWrapper(store)

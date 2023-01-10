import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import dataReducer from "../reducer/dataReducer";

const combinedReducer = combineReducers({
  datas: dataReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) =>
  combinedReducer(state, action);
const store = configureStore({
  reducer: rootReducer,
});

export { store };

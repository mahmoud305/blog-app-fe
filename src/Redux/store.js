import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userRedux"
import {adminReducer} from "../Redux/userRedux"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
// const rootReducer = combineReducers({ xx: userReducer, admin: adminReducer });
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export let persistor = persistStore(store);

import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthSlice from '../slices/AuthSlice';
import reduxThunk from 'redux-thunk';

export default configureStore ({
    reducer: {
        auth: AuthSlice, 
    },
    middleware: [...getDefaultMiddleware({serializableCheck: false}), reduxThunk],
});
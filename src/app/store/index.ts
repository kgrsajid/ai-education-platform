import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../features/api';
import { assignmentApi } from '../../features/api/assignment';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [assignmentApi.reducerPath]: assignmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, assignmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

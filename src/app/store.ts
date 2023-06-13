import {
  configureStore,
  createListenerMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import memberReducer from "./memberSlice";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: () => true,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem(
      "poppedMembers",
      JSON.stringify(state.member.poppedMembers)
    );
  },
});

const store = configureStore({
  reducer: {
    member: memberReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

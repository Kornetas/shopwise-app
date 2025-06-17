"use client";

import { Provider } from "react-redux";
import { store } from "./index";

// Wraps the Redux Provider, so you can use Redux hooks in your app
export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

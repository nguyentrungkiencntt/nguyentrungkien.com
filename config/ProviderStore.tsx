import { Provider } from "react-redux";
import { ReactNode } from "react";
import {store} from "../app/store/lib/store";


export const ProviderStore = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};


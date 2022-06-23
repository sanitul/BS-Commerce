import type { AppProps } from "next/app";
import { useEffect } from "react";
import Axios from "axios";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "../components/layout";
import { config } from "../config";
import { store } from "../store";

import "../styles/App.scss";

Axios.defaults.baseURL = config?.restPrefix;
Axios.defaults.headers.common = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiYjNlOGFkLWQ5YjktNDc2Mi1iMDhmLTExMDNlYTk1OTc1NyIsInVzZXJuYW1lIjoic2VlZmF0aGltZWwxQGdtYWlsLmNvbSIsImxvZ0luVGltZSI6MTY1NTgwMDkxMDY0NSwiaWF0IjoxNjU1ODAwOTEwLCJleHAiOjE2NTU4ODczMTB9.DWKGNO0_wEnFmPqqyZ6XDgxevcII_LSn5kC4pJChM60`,
};

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

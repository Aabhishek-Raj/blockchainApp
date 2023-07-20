import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains"
import App from "./App";
import "./index.css";

import { StateContextProvider } from "./context";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThirdwebProvider activeChain={Sepolia}>
    <BrowserRouter>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
);

import { useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import "./App.css";
import Canvas from "./Canvas";

require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

export const App = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">
        <h1 className="text-center">Hello, Aleo!</h1>

        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Testnet}
          autoConnect={true}
        >
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </WalletProvider>
      </div>
      <Canvas />
    </div>
  );
};

export default App;

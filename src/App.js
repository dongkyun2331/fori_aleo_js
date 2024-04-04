import { useMemo, useState } from "react";
import {
  WalletProvider,
  useWallet,
} from "@demox-labs/aleo-wallet-adapter-react";
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
            <WalletInfo /> {/* 수정된 부분 */}
          </WalletModalProvider>
        </WalletProvider>
      </div>
      <Canvas />
    </div>
  );
};

const WalletInfo = () => {
  const { wallet } = useWallet(); // 지갑 정보 가져오기
  const [walletAddress, setWalletAddress] = useState(""); // 지갑 주소 상태 설정

  wallet?.getAddress().then((address) => {
    setWalletAddress(address || "주소를 가져올 수 없음");
  });

  return (
    <div className="text-center mt-3">
      <p>지갑 주소: {walletAddress}</p>
    </div>
  );
};

export default App;

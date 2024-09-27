import { initializeSDK, Network } from "@bitkub-chain/sdk.js";
import type { AppProps } from "next/app";

export const sdk = initializeSDK(
  "66bf6a40cfeb07001cea0a2d",
  "sdk-b8f7a21f-8af9-46af-9a58-10b10510576d",
  Network.BKC_TESTNET
);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

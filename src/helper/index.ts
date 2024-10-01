import { sdk } from "@/pages/_app";
import { JsonRpcProvider } from "ethers";
import { AbiCoder, MaxUint256 } from "ethers";

export const getLoginStatus = async () => {
  console.log(await sdk.loginStatus());
};

export const getUserInfo = async () => {
  console.log(await sdk.getUserInfo());
  console.log(await sdk.getUserWalletAddress());
  console.log(await sdk.getUserTel());
  console.log(await sdk.getUserEmail());
  console.log(await sdk.getUserID());
};

export const getUserQuota = async () => {
  console.log(await sdk.getUserQuota());
};

const getBalance = async () => {
  console.log(await sdk.getBalanceNative());

  // ##############################################################################

  console.log(await sdk.getBalance20("KAP20_ADDRESS_HERE"));

  // ##############################################################################

  console.log(await sdk.getBalance721("KAP721_ADDRESS_HERE"));
};

const get721Info = async () => {
  console.log(await sdk.getTokenOfOwnerAll721("KAP721_ADDRESS_HERE"));

  // ##############################################################################

  const tokens = await sdk.getTokenOfOwnerByPage721(
    "KAP721_ADDRESS_HERE",
    1,
    3
  );
  console.log(tokens);

  // ##############################################################################

  console.log(await sdk.getMetadata721("KAP721_ADDRESS_HERE", tokens[0]));
};

const approveKKUB = async () => {
  console.log(
    await sdk.approveToken(
      "0x1BbE34CF9fd2E0669deEE34c68282ec1e6c44ab0",
      MaxUint256
    )
  );
};

const approve20 = async () => {
  console.log(await sdk.approveToken("KAP20_ADDRESS_HERE", 10000));

  // ##############################################################################

  console.log(
    await sdk.approveToken("KAP20_ADDRESS_HERE", 10000, "OPERATOR_ADDRESS_HERE")
  );
};

const approve721 = async () => {
  console.log(await sdk.approveNFT("KAP721_ADDRESS_HERE"));

  // ##############################################################################

  console.log(
    await sdk.approveNFT("KAP721_ADDRESS_HERE", "OPERATOR_ADDRESS_HERE")
  );
};

const getAllowanceToken = async () => {
  console.log(await sdk.getAllowanceToken("KAP20_ADDRESS_HERE"));
};

const getIsApprovedNFT = async () => {
  console.log(await sdk.getIsApprovedNFT("KAP721_ADDRESS_HERE"));
};

const transfer = async () => {
  console.log(await sdk.transferNative("TO_ADDRESS_HERE", 1));

  // ##############################################################################

  console.log(await sdk.transfer20("KAP20_ADDRESS_HERE", "TO_ADDRESS_HERE", 1));

  // ##############################################################################

  console.log(
    await sdk.transfer721("KAP721_ADDRESS_HERE", "TO_ADDRESS_HERE", 1)
  );
};

const sendCustomTx = async () => {
  const sendTxResult = await sdk.sendCustomTx(
    "0x932e16971dE9fA612Dc02d7EdF0DBbcbF7519579",
    "mySDKMethod1(uint256 var_, address bitkubNext_)",
    ["123"]
  );
  console.log(sendTxResult);

  // ##############################################################################

  const sendTxResult2 = await sdk.sendCustomTx(
    "0x22ad051F88C5FDe4f64f74D050d2175617A423EB",
    "mySDKMethod1(address var1_,uint256 var2_,string memory var3_,address bitkubNext_)",
    ["0x22ad051F88C5FDe4f64f74D050d2175617A423EB", "1234", "tmpString"]
  );
  console.log(sendTxResult2);

  // ##############################################################################

  const abiCoder = new AbiCoder();
  const res = abiCoder.encode(
    ["address[]"],
    [
      [
        "0xd9145CCE52D386f254917e481eB44e9943F39138",
        "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
      ],
    ]
  );
  const sendTxResult3 = await sdk.sendCustomTx(
    "0x22ad051F88C5FDe4f64f74D050d2175617A423EB",
    "mySDKMethod2(bytes memory abiEncodedAddressArr_,address bitkubNext_)",
    [res]
  );
  console.log(sendTxResult3);

  // ##############################################################################

  const sendTxResult4 = await sdk.sendCustomTx(
    "0x22ad051F88C5FDe4f64f74D050d2175617A423EB",
    "mySDKMethod3(address target_, uint256 a_, address)",
    ["TARGET_ADDRESS_HERE", "123"]
  );
  console.log(sendTxResult4);

  // ##############################################################################

  const sendTxResult5 = await sdk.sendCustomTx(
    "0x22ad051F88C5FDe4f64f74D050d2175617A423EB",
    "mySDKMethod4(address tokenAddr_, address recipient_, uint256 amount_, address bitkubNext_)",
    ["KAP20_ADDRESS_HERE", "TO_ADDRESS_HERE", "AMOUNT_HERE"]
  );
  console.log(sendTxResult5);

  // ##############################################################################

  const sendTxResult6 = await sdk.sendCustomTx(
    "0x22ad051F88C5FDe4f64f74D050d2175617A423EB",
    "mySDKMethod5(address tokenAddr_, address recipient_, uint256 tokenId_, address bitkubNext_)",
    ["KAP721_ADDRESS_HERE", "TO_ADDRESS_HERE", "TOKEN_ID_HERE"]
  );
  console.log(sendTxResult6);
};

export const getTransactionDetails = async (queueID: string) => {
  console.log(await sdk.getTransactionDetails(queueID));
};

export const isTxSuccessful = async (
  provider: JsonRpcProvider,
  txHash: string,
  signature: string
): Promise<boolean> => {
  const receipt = await provider.getTransactionReceipt(txHash);
  if (receipt == null) {
    return false;
  }

  const found = receipt.logs.findIndex((x) => {
    return (
      x.topics.length === 2 &&
      x.topics[0] ===
        "0xeef2e5ac6891c050b573d250673c404a0633142d7e2d873af23990c8eaf551e1" &&
      x.topics[1] === signature
    );
  });

  return found > 0;
};

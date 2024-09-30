import { useEffect, useState } from "react";
import { LoginStatus, UserInfo } from "@bitkub-chain/sdk.js";
import { sdk } from "./_app";

export default function Home() {
  const testFunction = async () => {};

  const [status, setStatus] = useState(LoginStatus.NOT_CONNECTED);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentStatus = await sdk.loginStatus();

      setStatus((prevStatus) => {
        if (prevStatus !== currentStatus) {
          console.log("currentStatus:", currentStatus);

          if (currentStatus === LoginStatus.CONNECTED) {
            sdk.getUserInfo().then(setUserInfo);
          } else if (currentStatus === LoginStatus.NOT_CONNECTED) {
            setUserInfo(null);
          }

          return currentStatus;
        }

        return prevStatus;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (status === LoginStatus.CONNECTED) {
    return (
      <div>
        <h1>Welcome, {userInfo?.id}</h1>
        <p>Email: {userInfo?.email}</p>
        <button onClick={() => sdk.logout()}>Logout</button>
        <button onClick={() => testFunction()}>Test Functions</button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => sdk.loginWithBitkubNext()}>Login</button>
      </div>
    );
  }
}

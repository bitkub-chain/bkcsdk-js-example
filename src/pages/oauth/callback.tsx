import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { sdk } from "../_app";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      exchange(code as string);
    }
  }, [router.query]);

  const exchange = async (code: string) => {
    await sdk.exchangeAuthorizationCode(code);
    window.close();
  };

  return (
    <div>
      <h2>Callback Page</h2>
      <p>Exchanging code for tokens...</p>
    </div>
  );
};

export default Callback;

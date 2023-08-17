"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

import Button from "./Button";

const AuthProviders = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    fetchProviders();
  }, []);

  // console.log(providers);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, index) => (
          <Button
            key={index}
            title="Sign In"
            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    );
  }
};

export default AuthProviders;

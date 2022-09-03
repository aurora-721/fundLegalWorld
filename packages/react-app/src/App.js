import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import MapChart from "./components/MapChart";

import { Body, Button, Container, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";

import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

function WalletButton() {
  const [rendered, setRendered] = useState("");

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <Button
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

function App() {
  // Read more about useDapp on https://usedapp.io/
  const { error: contractCallError, value: tokenBalance } =
    useCall({
       contract: new Contract(addresses.ceaErc20, abis.erc20),
       method: "balanceOf",
       args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
    }) ?? {};

  const { loading, error: subgraphQueryError, data } = useQuery(GET_TRANSFERS);

  useEffect(() => {
    if (subgraphQueryError) {
      console.error("Error while querying subgraph:", subgraphQueryError.message);
      return;
    }
    if (!loading && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, subgraphQueryError, data]);

  return (
    <Container>
      <Header>
        <WalletButton />
      </Header>
      <Body>
        <MapChart />
        <ComposableMap>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                />
              ))
            }
          </Geographies>
        </ComposableMap>
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
      </Body>
    </Container>
  );
}

export default App;

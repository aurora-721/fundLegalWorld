import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './components/Home';
import FundPoland from './components/FundPoland';
import ReactDOM from "react-dom";
import MapChart from "./components/MapChart";

import { Body, Button, Container, Header, Image, LinkComp } from "./components";
import logo from "./ethereumLogo.png";

import GET_TRANSFERS from "./graphql/subgraph";
import SubmitLegal from "./components/SubmitLegal";

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
    <Router>
    <Container>
      <Header>
      <Link to={'/'} className="nav-link">Home  </Link>
      <Link to={'/submitlegal'} className="nav-link">Submit Legal  </Link>
      
      <WalletButton />
      </Header>
      <Body>
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/fundpoland' element={<FundPoland />} />
              <Route path='/submitlegal' element={<SubmitLegal />} />
          </Routes>
      </Body>
    </Container>
    </Router>

  );
}

export default App;

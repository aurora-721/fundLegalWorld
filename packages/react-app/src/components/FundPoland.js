import React, { Component } from 'react';
import { Button } from '.';
import { addresses, abis } from "@my-app/contracts";

const About = () => {
    const { error: contractCallError, value: details } = useCall({
      contract: new Contract(addresses.legislatoor, abis.legislatoor),
      method: "details",
      args: [1], // id of 1 is poland
    }) ?? { totalContributions: 0 };

    return (
        <div>
          <h2>Fund Poland legal fees</h2>
          <p>Current money pledged: {details.totalContributions / 18} USDC</p>
          <Button>Connect wallet</Button>
        </div>
    );
}

export default About;
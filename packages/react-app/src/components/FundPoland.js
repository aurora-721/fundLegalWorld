import React, { useState } from 'react';
import { Submit, InputNumber } from '.';
import { Button } from '.';
import { addresses, abis } from "@my-app/contracts";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";

const About = () => {
    const [form, setForm] = useState({amount: 0});

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    
    }
    
    const { error: contractCallError, value: details } =
    useCall({
       contract: new Contract(addresses.legislatoor, abis.legislatoor),
       method: "details",
       args: [1],
    }) ?? { };

    return (
        <div>
          <h2>Fund Poland legal fees</h2>
          <p>Current money pledged: {(details?.totalContributions ?? 0) / 18} USDC</p>
          <p>Amount yet to be pledged: 300.00 €</p>
          <p>Percentage funded: 10%</p>
          <form onSubmit={onSubmit}>
            <label htmlFor="fname">Input amount you want to pledge: </label>
            <InputNumber value={form.amount} onChange={(e) => {
                setForm({
                    ...form,
                    amount: e.target.value,
                });
            }} name="Broker_Fees" min="0" max="10000" step="1"/>
            <div>
            <Submit style={{marginTop: 30 }}/>

            </div>
          </form>
        </div>
    );
}

export default About;
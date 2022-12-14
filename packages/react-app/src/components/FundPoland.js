import React, { useState } from 'react';
import { Submit, InputNumber } from '.';
import { Button } from '.';
import { addresses, abis } from "@my-app/contracts";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useSendTransaction, useContractFunction, useEthers, useLookupAddress } from "@usedapp/core";
import { utils } from 'ethers'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

const WrapContributeComponent = () => {
  const legislatorInterface = new utils.Interface(abis.legislatoor)
  const contract = new Contract(addresses.legislatoor, legislatorInterface)

  const { state, send } = useContractFunction(contract, 'contribute', { transactionName: 'Wrap' });
  const { status } = state

  const wrapContribute = () => {
    void send(2, 150 * 18);
  }

  return (
    <div>
      <p>Status: {status}</p>
      <Button style={{marginTop: 10, marginBottom: 30 }} 
      onClick={() => wrapContribute()}>Contribute</Button>
    </div>
  )
}

const About = () => {
    const [form, setForm] = useState({amount: 0});

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);

      }
    
    const { error: contractCallError, value: details } = useCall({
       contract: new Contract(addresses.legislatoor, abis.legislatoor),
       method: "details",
       args: [2],
    }) ?? { };

    return (
        <div>
          <h2>Fund Poland legal fees</h2>
          <p>Current money pledged: {Math.round((details?.totalContributions ?? 0) / 18, 2)} USDC</p>
          <p>Amount yet to be pledged: {80000 - Math.round((details?.totalContributions ?? 0) / 18, 2)} USDC</p>
          <form onSubmit={(e)=> {onSubmit(e)}}>
            <label htmlFor="fname">Input amount you want to pledge: </label>
            <InputNumber value={form.amount} onChange={(e) => {
                setForm({
                    ...form,
                    amount: e.target.value,
                });
            }} name="Broker_Fees" min="0" max="10000" step="1"/>
            <div>
            <WrapContributeComponent />

            <Button
            style={{backgroundColor: 'green', color: 'white'}}
             onClick={() => {
                console.log(form.amount);

                new RampInstantSDK({
                    hostAppName: 'your dApp',
                    hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
                    swapAmount: '15000000000000000000', // 150 USDC in wei
                    swapAsset: 'ETH_DUMMY',
                    url: 'https://widget.hackaton.ramp-network.org',
                    hostApiKey: 'tmvqmj9bnyt6uz2w6qj2ahmtq5ngmc8tt2tjponb',
                    userAddress: '0xEA6f3a32aB3f4D265A5C1272B3C69f9c15457590',
                  }).on('*', event => console.log(event)).show();
                  
            }}>Pay with Fiat</Button>


            </div>
          </form>
        </div>
    );
}

export default About;
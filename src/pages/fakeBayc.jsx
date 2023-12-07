import React, { useEffect, useState } from 'react';
import { abi, contractAddress } from "./constants.js";
import Web3 from 'web3';

function FakeBayc() {
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [contractName, setContractName] = useState('');
    const [totalTokens, setTotalTokens] = useState(0);

    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await ethereum.request({ method: "eth_requestAccounts" })
                setConnectionStatus('Connected'); // Update button text
                const accounts = await ethereum.request({ method: "eth_accounts" })
                console.log(accounts)
            } catch (error) {
                console.log(error)
            }
        } else {
            setConnectionStatus('Please install MetaMask'); // Update button text
        }
    }

    useEffect(() => {
        // Code to interact with the smart contract and retrieve the name and total token number

        async function fetchContractData() {
            try {
                if (typeof window.ethereum !== "undefined") {
                    // Check if MetaMask is connected
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    if (accounts.length > 0) {
                        setConnectionStatus('Connected');
                        const contract = new web3.eth.Contract(abi, contractAddress);

                        // Retrieve the name
                        const name = await contract.methods.name().call();
                        setContractName(name);
                        console.log(name);

                        // Retrieve the total token number
                        const totalSupply = await contract.methods.totalSupply().call();
                        setTotalTokens(totalSupply.toString());
                        console.log(totalSupply.toString());
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchContractData();
    }, []);

    async function mintToken() {
        try {
            if (typeof window.ethereum !== "undefined") {
                console.log('MetaMask is installed!');
                // Check if MetaMask is connected
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    console.log('MetaMask is connected!');
                    setConnectionStatus('Connected');
                    const contract = new web3.eth.Contract(abi, contractAddress);

                    // Use send() for state-changing functions
                    const transaction = await contract.methods.claimAToken().send({
                        from: accounts[0],
                    });

                    console.log('Transaction details:', transaction);
                }
                else {
                    // setConnectionStatus('Please connect MetaMask');
                    try {
                        await ethereum.request({ method: "eth_requestAccounts" })
                        setConnectionStatus('Connected'); // Update button text
                        const accounts = await ethereum.request({ method: "eth_accounts" })
                        console.log(accounts)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } catch (error) {
            console.log(error);
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <button onClick={connect}>Connect</button>
                <p>Status: {connectionStatus}</p>
            </div>
            <div>
                <h2>Contract Information</h2>
                <p>Name: {contractName}</p>
                <p>Total Tokens: {totalTokens}</p>
            </div>
            <div>
                <button onClick={mintToken}>Mint Token</button>
            </div>
        </>
    );
}

export default FakeBayc;
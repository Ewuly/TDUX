// TokenPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { abi, contractAddress } from "./constants.js";
import axios from 'axios'; // You may need to install axios using npm install axios
import Web3 from 'web3';


function TokenPage() {
    const { tokenId } = useParams();
    const [tokenData, setTokenData] = useState(null);

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                // Use either window.ethereum or window.web3
                const web3 = window.ethereum || window.web3;

                if (!web3) {
                    throw new Error('Web3 provider not found');
                }

                // Wait for the Ethereum provider to be connected
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Ethereum provider is connected');
                
                console.log(contractAddress)
                // Fetch metadata URI from the contract for the given tokenId
                const contract = new web3.eth.Contract(abi, contractAddress);
                console.log(contract)

                const tokenUri = await contract.methods.tokenURI(tokenId).call();

                // Fetch metadata from the URI
                const response = await axios.get(tokenUri);
                setTokenData(response.data);
            } catch (error) {
                console.error('Error fetching token data:', error.message);
            }
        };

        fetchTokenData();
    }, [tokenId]);

    if (!tokenData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <h1>Token Page</h1>
                <p>Token ID: {tokenId}</p>
            </div>
            <div>
                <h2>Token #{tokenId}</h2>
                {/* <img src={tokenData.image} alt={`Token ${tokenId}`} /> */}
                {/* Render other attributes as needed */}
            </div>
        </>
    );
};

export default TokenPage;

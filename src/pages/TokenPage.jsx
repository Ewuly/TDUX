// TokenPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { abi, contractAddress } from "./constants.js";
import axios from 'axios'; // You may need to install axios using npm install axios
import Web3 from 'web3';


function TokenPage() {
    const { tokenId } = useParams();
    const [tokenData, setTokenData] = useState(null);
    const [imageURL, setImageURL] = useState('');


    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                // Use either window.ethereum or window.web3
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();

                if (!web3) {
                    throw new Error('Web3 provider not found');
                }

                // Wait for the Ethereum provider to be connected
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Ethereum provider is connected');

                console.log("contractAddress")
                // Fetch metadata URI from the contract for the given tokenId
                const contract = new web3.eth.Contract(abi, contractAddress);
                console.log("contract")

                const tokenUri = await contract.methods.tokenURI(tokenId).call();
                const response = await fetch(tokenUri);
                // console.log(response)
                const data = await response.json();
                // console.log(data)
                const image = data.image;
                // console.log(image)
                const metadata = { image, attributes: data.attributes };
                // console.log(metadata)
                const attributes = data.attributes;
                // console.log(attributes)
                
                setTokenData(data);
                
                const cid = data.image.replace('ipfs://', '');
                const ipfsGatewayURL = `https://ipfs.io/ipfs/${cid}`;
                setImageURL(ipfsGatewayURL);
            } catch (error) {
                console.error('Error fetching token data:', error.message);
            }
        };
        fetchTokenData();


    }, [tokenId]);

    if (!tokenData) {
        return <div>
            <h1>Token {tokenId}</h1>
            <h1>TOKEN DOES NOT EXIST</h1>
            <h1>THIS IS A CLEAN ERROR MESSAGE</h1>
        </div>;
    }

    return (
        <>
            <div>
                <h1>Token {tokenId}</h1>
            <img src={imageURL} alt={`Token ${tokenId}`} />
                <div>
                    {tokenData.attributes.map((attribute, index) => (
                        <div key={index}>
                            {attribute.trait_type}: {attribute.value}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TokenPage;

const axios = require('axios');
const ethers = require('ethers');

//send address

async function sendOwnerAddress(ownerAddress){
    try{
        const response = await axios.post(`${BASE_URL}`,{
            ownerAddress:ownerAddress,
        });
        console.log("Successfully sent owner's address : ", response.status);
    }catch (error){
        console.log("error sending address", error);
    }
}

module.exports = {sendOwnerAddress};
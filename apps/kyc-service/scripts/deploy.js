// const { ethers } = require("hardhat");
// const axios = require('axios');

// const data = {
//     nidNumber: "1234567890",
//     firstName: "John",
//     lastName: "Doe",
//     ownerAddress: "0xYourOwnerAddressHere"
//   };
  

// async function main() {
  
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);
//   const data = {
//     nidNumber: "1234567890",
//     firstName: "John",
//     lastName: "Doe",
//   };
  
//   const KYC = await ethers.getContractFactory("KYC");
//   const kyc = await KYC.deploy();

//   await kyc.waitForDeployment();

//   console.log("KYC contract deployed to:",await kyc.getAddress());

 
//   try {
//     const response = await axios.post("http://localhost:3000/api/owner", {
//       ownerAddress: deployer.address,
//     });

//     console.log("Sent owner's address to local server:", response.status);
//   } catch (error) {
//     console.error("Error sending owner's address:", error);
//   }

//   try {
//     const response = await axios.post("http://localhost:3000/api/person", data);

//     console.log("Sent owner's address to local server:", response.status);
//   } catch (error) {
//     console.error("Error sending data owner's address:", error);
//   }


// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


const { ethers } = require("hardhat");
const axios = require('axios');
const fs = require("fs");

const data = {
  nidNumber: "1234567891",
  first_name: "John",
  last_name: "Doe"
};

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  
  const KYC = await ethers.getContractFactory("KYC");
  const kyc = await KYC.deploy();

  await kyc.waitForDeployment();

  const contractAddress = await kyc.getAddress();
  console.log("KYC contract deployed to:", contractAddress);
  fs.writeFileSync("deployed-address.json", JSON.stringify({ KYC: contractAddress }));

  try {
        const response = await axios.post("http://localhost:3005/api/owner", {
          ownerAddress: deployer.address,
        });
    
        console.log("Sent owner's address to local server:", response.status);
      } catch (error) {
        console.error("Error sending owner's address:", error);
      }
  

//   try {
//     const response = await axios.get("http://localhost:3000/api/person", data, {
//       timeout: 5000  
//     });
//     console.log("Sent person's data to local server:", response.status);
//     console.log("Response : ", response);
//   } catch (error) {
//     console.error("Error sending person's data:", error.message);
//   }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


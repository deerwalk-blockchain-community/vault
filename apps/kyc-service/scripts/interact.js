const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();

    const KYC = await ethers.getContractFactory("KYC");
    const kyc = await KYC.attach("0x1Dd1139BbCdDc83d231942ad247d292a1116bbfd");

    const nidNumber = "12312";
    const personData = await KYC.getPerson(nidNumber);

    console.log("Person data" ,{
        firstName: personData[0],
    lastName: personData[1],
    nidNumber: personData[2],
    })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
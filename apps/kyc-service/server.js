const express = require('express');
const bodyParser = require('body-parser');
const hre = require('hardhat'); 
const fs = require("fs");
var path = require("path");

var jsonPath = path.join(__dirname, '.',  'deployed-address.json');

let jsonString = fs.readFileSync(jsonPath,'utf8')
const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello! The server is running.');
});

// Endpoint to receive the owner's address
app.post('/api/owner', (req, res) => {
    const { ownerAddress } = req.body;

    if (!ownerAddress) {
        return res.status(400).send('Owner address is required');
    }

    console.log("Received owner's address:", ownerAddress);
    res.status(200).send({ message: 'Owner address received successfully' });
});


app.post('/api/person', async (req, res) => {
    const { nidNumber, firstName, lastName } = req.body;

    // Validate request body
    if (!nidNumber || !firstName || !lastName) {
        return res.status(400).send('Missing required fields: nidNumber, firstName, lastName');
    }

    try {
        // Get the deployed KYC contract using Hardhat
        const KYC = await hre.ethers.getContractAt("KYC", "0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7");
        const tx = await KYC.createPerson(nidNumber, firstName, lastName);
        await tx.wait();

        console.log(`Person with NID ${nidNumber} created successfully on the blockchain`);
        res.status(200).send(`Person with NID ${nidNumber} created successfully`);
    } catch (error) {
        console.error('Error creating person:', error);
        res.status(500).send('Error creating person on the blockchain');
    }
});


app.get('/api/person/:nidNumber', async (req, res) => {
    const { nidNumber } = req.params;

    if (!nidNumber) {
        return res.status(400).send('nidNumber is required');
    }

    try {
        
        const KYC = await hre.ethers.getContractAt("KYC", `${JSON.parse(jsonString).KYC}`);

        const person = await KYC.getPerson(nidNumber);
        console.log(person);
        const [firstName, lastName, retrievedNidNumber] = person;

        if (!firstName || !lastName || !retrievedNidNumber) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Return the person data
        console.log("PERSON's DATA " + person);
        return res.status(200);
        // return res.status(200).json({
        //     firstName,
        //     lastName,
        //     nidNumber: retrievedNidNumber
        // });
    } catch (error) {
        console.error('Error fetching person data:', error);
        res.status(500).send('Error fetching person data from the blockchain');
    }
});

app.get('/api/person',async(req,res)=>{
    console.log("fetching data ");
    return res.status(200);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(JSON.parse(jsonString).KYC);
});

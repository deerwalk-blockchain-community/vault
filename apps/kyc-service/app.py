from fastapi import FastAPI
from pydantic import BaseModel
from brownie_project.scripts.brownie_interface import create_person as save_to_chain, get_person as get_from_chain

# Use Pydantic to handle the data model and validation
class PersonModel(BaseModel):
    firstName: str
    lastName: str
    nidNumber: str

app = FastAPI()

@app.post("/person/")
def create_person(person: PersonModel):
    # Here you can put the code to interact with the blockchain using Brownie to feed the data to the contract.
    save_to_chain(person.nidNumber, person.firstName, person.lastName)  # this line is added
    return {"message": "Person data has been sent to the smart contract"}

@app.get("/person/{nid}")
def read_person(nid: str):
    # Here you can put the code to interact with the blockchain using Brownie to fetch the data from the contract.
    person = get_from_chain(nid)  # this line is added
    return {"nid": nid, "firstName": person[0], "lastName": person[1]}  # replace with actual data

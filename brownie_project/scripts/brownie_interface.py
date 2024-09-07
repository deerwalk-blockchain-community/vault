from brownie import KYC, accounts, network, config

# get the contract instance
def get_contract():
    if network.show_active() == "development":
        return KYC[len(KYC) - 1]  # return the last deployed contract
    else:
        return KYC.at(config["networks"][network.show_active()]["kyc_contract"])

# deploy the contract
def deploy_contract():
    # get our account to deploy the contract
    deployer_account = accounts[0]

    # remove the previously deployed contracts in the development network
    if network.show_active() == "development":
        for contract in KYC:
            contract.close({"from": deployer_account})

    KYC.deploy({"from": deployer_account})

# create a person in the smart contract
def create_person(nid_number: str, first_name: str, last_name: str):
    account = accounts[0]
    contract = get_contract()
    tx = contract.createPerson(nid_number, first_name, last_name, {"from": account})

    tx.wait(1)  # wait for 1 block confirmation

# fetch a person from the smart contract
def get_person(nid_number: str):
    contract = get_contract()
    return contract.getPerson(nid_number

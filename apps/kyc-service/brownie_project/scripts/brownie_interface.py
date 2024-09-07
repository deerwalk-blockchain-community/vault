from brownie import accounts, network, config
from brownie.network.contract import Contract
from web3 import Web3, exceptions

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

deployer_account = None
account = None

try:
    deployer_account = w3.eth.accounts[0]
    account = w3.eth.accounts[0]
except exceptions.ConnectionError:
    print("Cannot connect to the Ethereum node")

def get_contract():
    active_network = network.show_active()
    if active_network is None:
        return None

    address_config = config["networks"][active_network]["kyc_contract"]
    abi_config = "KYC.json"
    return Contract.from_abi("KYC", address=address_config, abi=abi_config)

def deploy_contract():
    if network.show_active() == "development":
        for contract in KYC:
            contract.close({"from": deployer_account})

    KYC.deploy({"from": deployer_account})

def create_person(nid_number: str, first_name: str, last_name: str):
    contract = get_contract()
    if contract is None:
        print("Cannot get contract as no Ethereum node connected")
        return
    tx = contract.createPerson(nid_number, first_name, last_name, {"from": account})
    tx.wait(1)

def get_person(nid_number: str):
    contract = get_contract()
    if contract is None:
        print("Cannot get contract as no Ethereum node connected")
        return None

    return contract.getPerson(nid_number)

def main():
    deploy_contract()
    create_person("111-222-333", "John", "Doe")
    person = get_person("111-222-333")
    if person is None:
        print("Cannot fetch person from contract as no Ethereum node connected")
        return
    print(person)

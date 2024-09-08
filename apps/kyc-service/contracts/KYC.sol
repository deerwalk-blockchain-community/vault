pragma solidity >=0.4.22 <0.9.0;

contract KYC {
    struct Person {
        string first_name;
        string last_name;
        string nidNumber;
    }

    mapping(string => Person) private people;

    function createPerson(
        string memory _nidNumber,
        string memory _first_name,
        string memory _last_name
    ) public {
        people[_nidNumber] = Person(_first_name, _last_name, _nidNumber);
    }

    function getPerson(
        string memory _nidNumber
    ) public view returns (string memory, string memory, string memory) {
        Person memory person = people[_nidNumber];
        return (person.first_name, person.last_name, person.nidNumber);
    }
}

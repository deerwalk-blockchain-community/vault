pragma solidity >=0.4.22 <0.9.0;

contract KYC {
    struct Person {
        string firstName;
        string lastName;
        string nidNumber;
    }

    mapping(string => Person) private people;

    function createPerson(
        string memory _nidNumber,
        string memory _firstName,
        string memory _lastName
    ) public {
        people[_nidNumber] = Person(_firstName, _lastName, _nidNumber);
    }

    function getPerson(
        string memory _nidNumber
    ) public view returns (string memory, string memory, string memory) {
        Person memory person = people[_nidNumber];
        return (person.firstName, person.lastName, person.nidNumber);
    }
}

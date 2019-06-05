pragma solidity ^0.4.17;


contract Factory{
   // address[] public contractAddress;
    mapping (bytes32 => address) public userAddress;
    mapping (bytes32 =>address) public thirdPartyAddress;
    
    
    function createUser(bytes32  hashValue) public{
        
        require(userAddress[hashValue] == 0x0);
        address newUser = new main_contract(msg.sender);
        userAddress[hashValue] =newUser;
        //contractAddress.push(newUser);
    }
    
    function createThirdParty(bytes32 hashValue)public{
        require(thirdPartyAddress[hashValue] == 0x0);
        address newParty = new third_party(msg.sender);
        thirdPartyAddress[hashValue]=newParty;
    }
    
    function userSignIn(bytes32 hashValue) public view returns(address) {
        require(userAddress[hashValue]!=0x0);
        return userAddress[hashValue];
  
    }
    
    function thirdPartySignIn(bytes32 hashValue) public view returns(address){
        require(thirdPartyAddress[hashValue] != 0x0);
        return thirdPartyAddress[hashValue];
    }
    
    // function getContractAddress()public view returns(address[]){
    //     return contractAddress;
        
    // }
}



contract main_contract{
    address public user_address;
    mapping (address => bool) public users;
    
    struct deviceInfo{
        string name;
        string mac;
        bool access;
    }
    
    struct Request{
        string description;
        address sendersAddress;
        string companyName;
        string contractAddress;
        bool access;
    }
    
    modifier restricted(){
        require(msg.sender == user_address);
        _;
    }
    
    
    deviceInfo[] public deviceData;
    Request[] public requests;
    
    
    function main_contract(address creator) public{
        user_address =creator;
    }
    
    function addDevice(string name ,string mac)public{
        deviceInfo memory newDevice= deviceInfo({
           name: name,
           mac: mac,
           access: true
        });
        
        deviceData.push(newDevice);
        
        
    }
    
  
    
    function giveDeviceAccess(uint index)public restricted{
        
              deviceData[index].access =true;
    }
    
    function removeDeviceAccess(uint index)public restricted{
        deviceData[index].access =false;
    }
    
    function requestAccess(uint index)public restricted {
        requests[index].access =true;
        
    }
    
    function sendRequest(string description ,string companyName,string contractAddress) public{
        Request memory newRequest = Request({
           description: description,
           sendersAddress: msg.sender,
           contractAddress:contractAddress,
           companyName: companyName,
           access:false
        });
        
        requests.push(newRequest);
        
    }
    
   function getSummary() public view returns(uint,uint){
    return(
            deviceData.length,
            requests.length
        );
   }
    
    
}




contract third_party{
     address public third_party_owner;
     mapping(address=>address) public user;
     
      struct Request{
        string description;
        address receiverAddress;
        bool access;
        string username;
        string password;
    
    }
    
    Request[] public thirdPartyRequests;
    
    function setRequestData(string description,address receiverAddress ) public {
        
        Request memory newRequest= Request({
            description:description,
            receiverAddress:receiverAddress,
            access:false,
            username:'',
            password:''
        });
        
        thirdPartyRequests.push(newRequest);
        user[receiverAddress]=receiverAddress;
        
    }
    
       
    function giveAccessToRequest(uint index,string username,string password)public {
                // require(user[msg.sender] != 0x0);
              thirdPartyRequests[index].access =true;
              thirdPartyRequests[index].username=username;
              thirdPartyRequests[index].password=password;
    }
    
    function removeAccessForRequest(uint index)public {
                // require(user[msg.sender] != 0x0);
              thirdPartyRequests[index].access =false;
              thirdPartyRequests[index].username='';
              thirdPartyRequests[index].password='';
    }
    

    function third_party(address creator) public{
        third_party_owner= creator;
        
    }
    
     function getThirdPartySummary() public view returns(uint){
    return(
            thirdPartyRequests.length,
            
        );
   }
    
    
}
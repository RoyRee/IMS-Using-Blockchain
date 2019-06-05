import web3 from './web3';
import main_contract from './build/main_contract.json';

export default(address)=>{
	return new web3.eth.Contract(
		JSON.parse(main_contract.interface) , address
		);
};
import web3 from './web3';
import third_party from './build/third_party.json';

export default(address)=>{
	return new web3.eth.Contract(
		JSON.parse(third_party.interface) , address
		);
};
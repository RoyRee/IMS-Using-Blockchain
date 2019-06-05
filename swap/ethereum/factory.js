import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
		JSON.parse(Factory.interface),
		'0xD5fB5B3Cf3eF3A9e7f3DAB46016456BCCeCfBf21'
		// ENter Your own Contract Address after Deployment
	);

export default instance;
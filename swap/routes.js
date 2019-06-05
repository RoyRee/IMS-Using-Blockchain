const routes = require('next-routes')();

routes
		.add('/instances/:address/showData','/instances/showData')
        .add('/instances/:address/:username/showData','/instances/showData')
		.add('/instances/:address/:username/HomePage','/instances/HomePage')
		.add('/instances/:address/:username/AddDevice','/instances/AddDevice')
		.add('/instances/:address/:username/Requests','/instances/Requests')
		.add('/:address/thirdPartyHomePage','/thirdPartyHomePage')
		
		.add('/:address/thirdParty','/thirdParty');
		
		



module.exports = routes;
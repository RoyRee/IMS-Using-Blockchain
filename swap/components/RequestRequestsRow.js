
import React,{Component} from 'react';
import {Table,Button} from'semantic-ui-react';
import Instance from '../ethereum/instance';
import ThirdPartyInstance from '../ethereum/thirdPartyInstance';
import web3 from '../ethereum/web3';

class RequestRequestsRow extends Component{


	giveAccess = async () =>{
		const instance = Instance(this.props.address);
		
		const accounts = await web3.eth.getAccounts();	
		
		
		await instance.methods.requestAccess(this.props.id).send({
			from:accounts[0]
		});
		console.log(this.props.request.contractAddress);
		const thirdPartyInstance= ThirdPartyInstance(this.props.request.contractAddress);
		console.log(typeof(this.props.username));

		await thirdPartyInstance.methods.giveAccessToRequest(
			parseInt(this.props.id),
			this.props.username,
			this.props.username
		).send({from:accounts[0]});

		// console.log(requestCount[1]);
		// const requests = await Promise.all(
		// 		Array(parseInt(requestCount[1])).fill().map((element,index) =>{
		// 				return instance.methods.requests(index).call()
		// 		})
		// 	);
		// 	// const thirdPartyInstance= ThirdPartyInstance();
		// 	// console.log(requests[1]);
		// 	// console.log(requests[1].sendersAddress);

		// //console.log(accounts);
		
		

	}


	render(){
		const {Row,Cell} =Table;
		const {id,request,requestsCount} = this.props;

		return(
			<Row >
				<Cell>{id}</Cell>
				
				<Cell>{request.companyName}</Cell>
				<Cell>{request.description}</Cell>
				<Cell> 
					
					<Button  color="green" basic onClick={this.giveAccess}>
					 Give  Access 
					 </Button>
	

				</Cell>
			</Row>

			);
	}
}


export default RequestRequestsRow;
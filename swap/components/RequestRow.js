import React,{Component} from 'react';
import {Table,Button} from'semantic-ui-react';
import Instance from '../ethereum/instance';
import web3 from '../ethereum/web3';

class RequestRow extends Component{

	giveAccess = async () =>{
		const instance = Instance(this.props.address);
		const accounts = await web3.eth.getAccounts();
		await instance.methods.giveDeviceAccess(this.props.id).send({
			from:accounts[0]
		});
	}

	removeAcess = async ()=>{
		const instance = Instance(this.props.address);
		const accounts = await web3.eth.getAccounts();
		await instance.methods.removeDeviceAccess(this.props.id).send({
			from:accounts[0]
		});
	}

	render(){
		const {Row,Cell} =Table;
		const {id,device,deviceCount} = this.props;

		return(
			<Row >
				<Cell>{id}</Cell>
				<Cell>{device.name}</Cell>
				<Cell>{device.mac}</Cell>
				<Cell> 
					{device.access ? null :(
					<Button disabled ={device.access} color="green" basic onClick={this.giveAccess}>
					 Give Access 
					</Button>
					)}

				{!device.access ? null :(
				<Button disabled ={!device.access}  color ="red" basic onClick={this.removeAcess}>
				Remove Access
				</Button>
				)}
				</Cell>

			</Row>

			);
	}
}


export default RequestRow;
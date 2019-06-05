import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Link } from '../../routes';
import {Button,Table,Container} from 'semantic-ui-react';
import Instance from '../../ethereum/instance';
import web3 from '../../ethereum/web3';
import RequestRow from '../../components/RequestRow';

class HomePage extends Component{


	
	static async getInitialProps(props){

		const {address} =props.query;
		const {username} =props.query;
		const instance = Instance(address);
		const deviceCount = await instance.methods.getSummary().call();
		console.log(deviceCount[0]);
		const devices = await Promise.all(
				Array(parseInt(deviceCount[0])).fill().map((element,index) =>{
						return instance.methods.deviceData(index).call()
				})
			);

			console.log(devices);

		
		return{address ,devices,deviceCount,username} ;
	}


renderRow(){
	return this.props.devices.map((device,index) =>{
		return(
			<RequestRow
			key={index}
			id={index}
			device={device}
			address={this.props.address}
			/>
			);
	});
	
}


	render(){

		const{
			Header,Row,HeaderCell,Body
		}=Table;
		
		return(
			<Layout address ={this.props.address} username={this.props.username}>

				<Container>

			 <Table>
			  <Header>
			  <Row>
			  	<HeaderCell>ID</HeaderCell>
			  	<HeaderCell>Name of the Device</HeaderCell>
			  	<HeaderCell>Mac Address</HeaderCell>
			  	<HeaderCell>Access</HeaderCell>
			  </Row>
			  </Header>
			  <Body>
			  {this.renderRow()}
			  </Body>

			 </Table>
			 <Link route={`/instances/${this.props.address}/showData`}>
			 <a>
			 	<Button primary floated="right" style={{marginBottom:10}}>Add Device</Button>
			 </a>

			 </Link>
			 </Container>
				</Layout>
			);

	}
}

export default HomePage;


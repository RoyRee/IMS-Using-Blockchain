import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Button,Table,Container} from 'semantic-ui-react';
import {Link} from '../../routes';
import Instance from '../../ethereum/instance';
import RequestRequestsRow from '../../components/RequestRequestsRow';

class Requests extends Component{

	static async getInitialProps(props){

		const {address} =props.query;
		const {username} =props.query;
		const instance = Instance(address);
		const requestsCount = await instance.methods.getSummary().call();
		console.log(requestsCount[1]);
		const requests = await Promise.all(
				Array(parseInt(requestsCount[1])).fill().map((element,index) =>{
						return instance.methods.requests(index).call()
				})
			);

			console.log(requests);
		return{address ,requests,requestsCount,username} ;
	}


  renderRow(){
	return this.props.requests.map((request,index) =>{
		return(
			<RequestRequestsRow
			id={index}
			request={request}
			address={this.props.address}
			username={this.props.username}

			/>
			);
	});
	
}

	render(){


		const{
			Header,Row,HeaderCell,Body
		}=Table;

		return(
			<Layout  address ={this.props.address} username={this.props.username}>
			<Container>

			 <Table>
			  <Header>
			  <Row>
			  	<HeaderCell>ID</HeaderCell>
			  	<HeaderCell>Company Name</HeaderCell>
			  	<HeaderCell>Description</HeaderCell>
			  	<HeaderCell>Access</HeaderCell>
			  </Row>
			  </Header>
			  <Body>
			  {this.renderRow()}
			  </Body>
			 </Table>
			 </Container>
			</Layout>
			);
	}
}


export default Requests;
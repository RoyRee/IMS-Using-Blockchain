import React,{Component} from 'react';
import {Table,Button} from'semantic-ui-react';
import ThirdPartyInstance from '../ethereum/thirdPartyInstance';
import web3 from '../ethereum/web3';
import {Link} from '../routes';

class RequestThirdPartyRows extends Component{

    
    
    showData = async () =>{
       
    }

	render(){
		const {Row,Cell} =Table;
        const {id,request} = this.props;
        

		return(
			<Row >
				<Cell>{id}</Cell>
				<Cell>{request.description}</Cell>
				<Cell>{request.receiverAddress}</Cell>
                <Cell>{!request.access ? null :(
                    <h4 style={{color:"green"}}>Access Granted</h4>
                )}
                
                {request.access ? null :(
                    <h4 style={{color:"red"}}>Access Denied</h4>
                )}
                </Cell>
                <Cell> 

				<Link route ={`/instances/${this.props.address}/showdata`}	>
				<a>
				<Button disabled ={!request.access} color="green" basic onClick={this.showData}>
					Show Data
				</Button>
				</a>

				</Link>
	
				</Cell>



			</Row>

			);
	}
}


export default RequestThirdPartyRows;
import React ,{Component} from 'react';
import {Button,Form,Container,Message ,Segment,Menu,Label,Table} from 'semantic-ui-react';
import Head from 'next/head';
import {Link} from '../routes';
import ThirdPartyInstance from '../ethereum/thirdPartyInstance';
import RequestThirdPartyRows from '../components/RequestThirdPartyRows';


class thirdPartyHomePage extends Component{

    static async getInitialProps(props){

        const {address} =props.query;
        const thirdPartyInstance = ThirdPartyInstance(address);
        const requestCount = await thirdPartyInstance.methods.getThirdPartySummary().call();
        console.log(requestCount[0]);
        const Requests = await Promise.all(
            Array(parseInt(requestCount[0])).fill().map((element,index) =>{
                    return thirdPartyInstance.methods.thirdPartyRequests(index).call()
            })
        );


        
        return{address,Requests};
    }


    renderRow(){
        return this.props.Requests.map((requests,index) =>{
            return(
                <RequestThirdPartyRows
                key={index}
                id={index}
                request={requests}
                address={this.props.address}
                />
                );
        });
        
    }


    state ={
    activeItem:''
  }



    handleItemClick = (e, { name }) =>{
        console.log(name);
       this.setState({ activeItem: name });
        }

    render(){

        const { activeItem } = this.state;
        const{
			Header,Row,HeaderCell,Body
		}=Table;
		

        return(
            <div>
			<Segment inverted color='teal'>
        
      <Menu inverted color='teal' secondary  size ='large' stackable>
      
      <Link route ={`/${this.props.address}/thirdPartyHomePage`}>
          <Menu.Item 
          name='Home'
           active={activeItem === 'Home'} 
           onClick={this.handleItemClick} />
       </Link>

       <Link route ={`/${this.props.address}/thirdParty`}>
          <Menu.Item 
          name='Send Request'
           active={activeItem === 'Send Request'} 
           onClick={this.handleItemClick} />
       </Link>

      
       <Link route ={`/`}>
          <Menu.Item 
          name='Logout'
           active={activeItem === 'Logout'} 
           onClick={this.handleItemClick} />
       </Link>
      </Menu>
			</Segment>

  	<Head>
      <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
     </Head>


     <Container>

    <Table>
    <Header>
    <Row>
     <HeaderCell>ID</HeaderCell>
     <HeaderCell>Description</HeaderCell>
     <HeaderCell>Receiver's Address</HeaderCell>
     <HeaderCell>status</HeaderCell>
     <HeaderCell>Show Data</HeaderCell>
 </Row>
 </Header>
 <Body>
 {this.renderRow()}
 </Body>

</Table>
<Link route={`/${this.props.address}/thirdParty`}>
<a>
    <Button primary floated="right" style={{marginBottom:10}}>Send Request</Button>
</a>

</Link>
</Container>


     </div>
     
        );

    }
}

export default thirdPartyHomePage;
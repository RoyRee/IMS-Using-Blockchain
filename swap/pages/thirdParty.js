import React,{Component} from 'react';
import Layout from '../components/Layout';
import {Button,Form,Container,Message ,Segment,Menu,Label} from 'semantic-ui-react';
import Instance from '../ethereum/instance';
import ThirdPartyInstance from '../ethereum/thirdPartyInstance';
import web3 from '../ethereum/web3';
import Head from 'next/head';
import {Link} from '../routes';


class thirdParty extends Component{



  static async getInitialProps(props){

		const {address} =props.query;
		return{address} ;
	}


	state ={
		errorMessage:'',
		description:'',
		company: '',
		loading: false,
    address:'',
    activeItem:''


  }
  

	


  	onSubmit = async event =>{
    event.preventDefault();

    this.setState({loading:true,errorMessage:''});
    const userInstance = Instance(this.state.address);
    const contractAddress = this.props.address;
    const thirdPartyInstance = ThirdPartyInstance(this.props.address);
    const {description,company} = this.state ;

    try{
      const accounts = await web3.eth.getAccounts();
      await userInstance.methods.sendRequest(
        description,
        company,
        contractAddress
        ).send({from: accounts[0]});

        await thirdPartyInstance.methods.setRequestData(
          description,
          this.state.address
        ).send({from: accounts[0]});

      this.setState({loading:false});
     // Router.push(`/instances/${this.props.address}/HomePage`);

      
    }catch(err){
      this.setState({errorMessage: err.message ,loading:false});
    }


    
  };

  

  handleItemClick = (e, { name }) =>{
    console.log(name);
   this.setState({ activeItem: name });
    }



	render(){
    const { activeItem } = this.state
    
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
     
		
      <Container  >



			<h1>Send a Request</h1>
	<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
    <Form.Field size='huge'>
      <label >Company Name</label>
      <input placeholder='Facebook Pvt.' 
      value={this.state.company}
      onChange={event =>this.setState({company: event.target.value})}
      />
    </Form.Field>

    <Form.Field>
      <label>Description</label>
      <input placeholder='Max 50 words'
      value={this.state.description}
      onChange={event =>this.setState({description: event.target.value})} />
    </Form.Field>

    <Form.Field>
      <label>Recipient's Address</label>
      <input placeholder='0x25dF55E9De091B59788f33f0A04E46373075aC76'
      value={this.state.address}
      onChange={event =>this.setState({address: event.target.value})} />
    </Form.Field>

    <Form.Field >
      <label>Sender's Address</label>
      <Label as='a' fluid="true" size="large"  >
      {this.props.address}
    </Label>
    </Form.Field>
    


    <Button color='teal' type='submit' loading={this.state.loading}>Submit</Button>

    <Message error header="Oops!" content={this.state.errorMessage} />
  </Form>
  </Container>
  </div>
	

			);
	}
}

export default thirdParty;
import React ,{Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {keccak256} from 'js-sha3';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Head from 'next/head';
import {Router} from '../routes';



class LoginForm extends Component{



state ={
	username: '',
	password: '',
  errorMessage:'',
  loading: false,
  

};

onSubmit = async () =>{
	event.preventDefault();

	const account = await web3.eth.getAccounts();
	console.log(account[0]);
  var values =this.state.username +this.state.password +account[0] ;
  console.log(values);
	var bytes ='0x'+keccak256(values);
  console.log(bytes);

		try{
      this.setState({errorMessage: '' ,loading: true});
			 const address = await factory.methods.userSignIn(bytes).call();
      console.log(address);
      this.setState({loading:false });
      Router.pushRoute(`/instances/${address}/${this.state.username}/HomePage`);

 		}catch(err){
			
      this.setState({errorMessage: err.message ,loading:false});
		}

		

}




render(){

	return(




  <div className='login-form' style={{ justifyContent:'center', alignItems:'center', height: '100vh'} }>

<Segment inverted color='teal' size='massive'>
IMS 
</Segment>
  <Head>
      <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
     </Head>



    <Grid textAlign='center' style={{ height: '90%' }} verticalAlign='middle'>

      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
           Log-in to your account
        </Header>

        <Form size='large' onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Segment stacked>
            <Form.Input 
            value={this.state.username}
            onChange={event =>this.setState({username: event.target.value})}
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Username'
             />


            <Form.Input
            value={this.state.password}
            onChange={event => this.setState({password: event.target.value})}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large' loading={this.state.loading}>
              Login 
            </Button>
          </Segment>
          <Message error header="Oops!!" content={this.state.errorMessage} />
        </Form>
        <Message>
          New to us? <a href='/SignUp'>Sign Up</a> 
          <br />
          Third Party Login <a href='/thirdPartyLogin'>Click here</a>                                                      
        </Message>
        
       
       
      </Grid.Column>
    </Grid>
   
  </div>

  
  

  );
}

}

export default LoginForm;
import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Button,Form ,Container ,Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Instance from '../../ethereum/instance';
import {Router} from '../../routes';
import Axios from 'axios';
import FileSaver from 'file-saver';


class AddDevice extends Component{

  state ={
    name: '',
    mac: '',
    loading: false,
    errorMessage: ''
  }

  static async getInitialProps(props){
    const {address} = props.query;
    const{username} =props.query;

    console.log(username);

    return{address,username};
  }

  onSubmit = async event =>{
    event.preventDefault();

    this.setState({loading:true,errorMessage:''});
    const instance = Instance(this.props.address);
    const {name,mac} = this.state ;

    try{
      const accounts = await web3.eth.getAccounts();
      await instance.methods.addDevice(
        name,
        mac
        ).send({from:accounts[0]});
      
      
     // await FileSaver.saveAs(`http://localhost:4000/${this.props.address}/${this.props.username}/setUpFile`,'setUpFile.txt');
    await Axios({
      method: "GET",
      url: `http://localhost:4000/${this.props.address}/${this.props.username}/setUpFile`,
      responseType: "blob"
    }).then(response  => {
        FileSaver.saveAs(response.data, filename);
     })
    .then(() => {
      
      console.log("Completed");
    });

        


      this.setState({loading:false});
      //Router.push(`/instances/${this.props.address}/HomePage`);

      
    }catch(err){
      this.setState({errorMessage: err.message ,loading:false});
    }


    
  };

  

	render(){

		return(
			<Layout  address ={this.props.address} username={this.props.username}>
      <Container text >
			<h1>Add a Device</h1>
			 <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
    <Form.Field size='huge'>
      <label >Name of the Device</label>
      <input placeholder=' Name' 
      value={this.state.name}
      onChange={event =>this.setState({name: event.target.value})}
      />
    </Form.Field>
    <Form.Field>
      <label>MAC Address</label>
      <input placeholder='Mac Address'
      value={this.state.mac}
      onChange={event =>this.setState({mac: event.target.value})} />
    </Form.Field>
    
    <Button color='teal' type='submit' loading={this.state.loading}>Submit</Button>

    <Message error header="Oops!" content={this.state.errorMessage} />
  </Form>
  </Container>
			</Layout>
			);
		}
}
export default AddDevice;
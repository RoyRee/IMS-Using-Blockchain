import React ,{Component} from 'react';
import {Link,Router} from '../../routes';
import { Container,Table,Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import axios from 'axios';
import FileSaver from '../../download';
var uri = 'http://localhost:5000/image/file_2019-03-27T00:56:51+05:30.jpg';


export default class showData extends Component{

    

    static async getInitialProps(props){

        const {address}=props.query;
        const {username} =props.query;
     
        var resData=[];
        await axios.get('http://localhost:4000/showData').then(res=> resData.push(res));
        
        var device=[]; 
         for(var i=0 ;i<resData[0].data.length;i++){
                device.push(resData[0].data[i]);

        }

        
        return{address,device ,username};

    }

    
    download1(e){
        //window.open(file_path,"_blank");

        
        // var pathkk= 'http://localhost:5000/image/'+e;
        // console.log(pathkk);

        var filename=e;
        axios({
            method: "GET",
            url: "http://localhost:5000/image/"+filename,
            responseType: "blob"
          }).then(response  => {
              FileSaver.saveAs(response.data, filename);
           })
          .then(() => {
            
            console.log("Completed");
          });
    }

    renderRow(){
        const{
            Row,Cell
        }=Table;

        return this.props.device.map((device,index)=>{

            return(
                <Row>
                    <Cell>{this.props.device[index]._id}</Cell>
                    <Cell>{this.props.device[index].filename}</Cell>
                    <Cell>{((this.props.device[index].length)/1024).toFixed(2)}</Cell>
                    <Cell>{this.props.device[index].uploadDate}</Cell>
                    <Cell>{this.props.device[index].contentType}</Cell>
                    <Cell>
                        <Button primary onClick={e=> this.download1(this.props.device[index].filename)}>
                            Download
                        </Button>
                    </Cell>
                </Row>
            );
           
            
        })
           
       
    }

   
    

    render(){

        const{
            Header,Row,HeaderCell,Body,Cell
        }=Table;
        return(

           

            <Layout address={this.props.address} username={this.props.username}>

            <Container>
                <Table  stackable={true}>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>
                                File Name
                            </HeaderCell>
                            <HeaderCell>Size(KB)</HeaderCell>
                            <HeaderCell>Date/Time</HeaderCell>
                            <HeaderCell>Content Type</HeaderCell>
                            <HeaderCell>Download</HeaderCell>
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
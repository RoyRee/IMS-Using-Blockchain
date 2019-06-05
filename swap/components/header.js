import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {Link,Router} from '../routes';

export default class MenuExampleInvertedSegment extends Component {

  state = { activeItem: 'Login' };

  handleItemClick = (e, { name }) =>{
    console.log(name);
   this.setState({ activeItem: name });
    }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted color='teal' >
        <Menu inverted color='teal' secondary  size ='large' stackable>


           <Link route ={`/instances/${this.props.address}/${this.props.username}/HomePage`}>
          <Menu.Item 
          name='home'
           active={activeItem === 'home'} 
           onClick={this.handleItemClick} />
           </Link>

          <Link route={`/instances/${this.props.address}/${this.props.username}/AddDevice`}>
          <Menu.Item
            name='Add Device'
            active={activeItem === 'Add Device'}
            onClick={this.handleItemClick}
          />
          </Link>

          <Link route={`/instances/${this.props.address}/${this.props.username}/Requests`}>
          <Menu.Item
            name='Requests'
            active={activeItem === 'Requests'}
            onClick={this.handleItemClick}
          />
          </Link>

          <Link route={`/instances/${this.props.address}/${this.props.username}/showData`}>
          <Menu.Item
            name='Show Data'
            active={activeItem=== 'Show Data'}
            onClick={this.handleItemClick}
            />
            </Link>

          <Link route={`/`}>
          <Menu.Item
            name='Logout'
            active={activeItem=== 'Logout'}
            onClick={this.handleItemClick}
            />

          </Link>
        </Menu>
      </Segment>
    )
  }
}

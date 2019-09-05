import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './bootstrap.css';
import {Admin, User} from './App';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: 0};
  }

  handleAdmin = (event) =>{
  	this.setState({isLoggedIn: 1});
  }

  handleUser = (event) =>{
  	this.setState({isLoggedIn: 2});
  }

  handleBack = (event) =>{
  	this.setState({isLoggedIn: 0});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    if (isLoggedIn===1) {
      return (
      	<div>
      	<input className='btn-lg btn btn-default' style={{display: 'inlineBlock'}} type='button' value='<' onClick={this.handleBack}></input>
      	<Admin />
      	</div>
      	);
    } else if (isLoggedIn===2) {
      return (
      	<div>
      	<input className='btn-lg btn btn-default' style={{display: 'inlineBlock'}} type='button' value='<' onClick={this.handleBack}></input>
      	<User />
      	</div>
      	
      	);
    }
    else{
    return (
    <div>
    	<input className='btn-lg btn btn-default' style={{display: 'inlineBlock'}} type='button' value='<' onClick={this.handleBack}></input>
      <div className='Container'>

          <h1 className='Heads'>Login As</h1>
          <div className='Content'>
          <form>
          <div className='FormGroup'>
          <input className='btn-lg btn btn-default Butn Select' type='submit' value='Admin' onClick={this.handleAdmin}></input>
          </div>

          <div className='FormGroup'>
          <input className='btn-lg btn btn-default Butn Select' type='submit' value='User' onClick={this.handleUser}></input>
          </div>
          </form>       
              
          </div>
        </div>
     </div>
    );
	}
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

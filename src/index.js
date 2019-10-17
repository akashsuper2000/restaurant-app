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
    this.state = {isLoggedIn: 0, user: '', pass: 'pass'};
  }

  handleAdmin = (event) =>{
    event.preventDefault();
    // eslint-disable-next-line
    if(document.getElementsByName('password')[0].value==this.state.pass){
  	 this.setState({isLoggedIn: 1});
    }
    else{
      document.getElementsByName('invalid')[0].style.visibility = 'visible';
    }
  }

  handleUser = (event) =>{
    event.preventDefault();
    // eslint-disable-next-line
    if(document.getElementsByName('username')[0].value!==''){
     this.setState({user: document.getElementsByName('username')[0].value});
    this.setState({isLoggedIn: 2});
    }
    else{
      document.getElementsByName('userinv')[0].style.visibility = 'visible';
    }
    
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
      	<User user={this.state.user}/>
      	</div>
      	
      	);
    }
    else{
    return (
    <div>
    	<input className='btn-lg btn btn-default' style={{display: 'inlineBlock', visibility: 'hidden'}} type='button' value='<' onClick={this.handleBack}></input>
      <div className='Container'>

          <h1 className='Heads'>Login As</h1>
          <div className='Content'>
          <form>

          <div className='FormGroup'>
          <input className='Boxes' style={{margin: 10, width: 200, padding: 7, borderRadius: 3}} name='username' placeholder='Name'></input>
          <input className='btn-lg btn btn-default Butn Select' type='submit' value='User' onClick={this.handleUser}></input>
          <span className='Subheads' name='userinv' style={{visibility: 'collapse'}}>Enter a username!</span>
          </div>

          <div className='FormGroup'>
          <input className='Boxes' style={{margin: 10, width: 200, padding: 7, borderRadius: 3}} name='password' type='password' placeholder='Password'></input>
          <input className='btn-lg btn btn-default Butn Select' type='submit' value='Admin' onClick={this.handleAdmin}></input>
          <span className='Subheads' name='invalid' style={{visibility: 'collapse'}}>Invalid password!</span>
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

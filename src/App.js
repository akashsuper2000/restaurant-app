import React from 'react';
import './App.css';
import './bootstrap.css';

class User extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      items: [{name: 'Soup', price: 200}, {name: 'Cake', price: 100}],
      cost: 0
    }
  };

  componentDidMount() {
      let self = this;
      fetch('/items', {
          method: 'POST'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({items: data});
      }).catch(err => {
      console.log('Caught it!',err);
      })
    }

  handleSelect = (event) => {
    event.preventDefault();
    var total = 0, i;
    for(i=0; i<document.getElementsByName('name').length; i++){
      total+=document.getElementsByName('quantity')[i].value*document.getElementsByName('price')[i].innerHTML;
    }
    this.setState({cost: total});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var data = {cost: this.state.cost};
    console.log(JSON.stringify(data));
    fetch("/bill", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        console.log(data);  
        // eslint-disable-next-line
        if(data == "success"){
        console.log('Success'); 
        }
    }).catch(function(err) {
        console.log(err);
    });
  }

  render(){
    return(

      <div className='Container'>

          <h1 className='Heads'>Restaurant Menu</h1>
          <div className='Content'>

            <form onSubmit={this.handleSubmit}>
              
              {this.state.items.map((item,i) =>
                <div className='FormGroup' key={i}>
                  <span className='Subheads' name='name'>{item.name}</span>
                  <span className='Price' name='price'>{item.price}</span>
                  <input className='Boxes' type='number' name='quantity' onChange={this.handleSelect}></input>
                </div>
              )}
              
              <p className='Subheads' style={{display: 'block'}}>Total cost: {this.state.cost}</p>
              <input className='btn-lg btn btn-default' type='submit' value='Order'/>
          
            </form>
          </div>
        </div>

    );
  }

}











class Admin extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      items: [{name: 'Soup', price: 200}, {name: 'Cake', price: 100}]
    }
  };

  componentDidMount() {
    document.getElementById("addbox").style.display = "none";
      let self = this;
      fetch('/items', {
          method: 'POST'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({items: data});
      }).catch(err => {
      console.log('Caught it!',err);
      })
    }

  handleSelect = (event) => {
    event.preventDefault();
    document.getElementById("addbox").style.display = "none";
    this.state.items.push({name: document.getElementsByName('newname')[0].value, price: document.getElementsByName('newprice')[0].value});
    this.setState({items: this.state.items});
  }

  handleAdd = (event) => {
    event.preventDefault();
    document.getElementById("addbox").style.display = "block";
  }

  handleRemove = (event) => {
    event.preventDefault();
    var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
    }

    removeByAttr(this.state.items, 'name', event.target.previousSibling.previousSibling.innerHTML);
    this.setState({items: this.state.items});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(this.state.items));
    fetch("/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.items)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        console.log(data);
        // eslint-disable-next-line
        if(data == "success"){
        console.log('Success'); 
        }
    }).catch(function(err) {
        console.log(err);
    });
  }

  render(){
    return(

      <div className='Container'>

        <h1 className='Heads'>Admin</h1>
        <div className='Content'>

        <form onSubmit={this.handleSubmit}>
          
          {this.state.items.map((item,i) =>
          <div className='FormGroup' key={i}>
            <span className='Subheads' name='name'>{item.name}</span>
            <span className='Price' name='price'>{item.price}</span>
            <input className='btn btn-lg btn-default' style={{margin: 10, width: 200, padding: 5}} type='button' value='- Remove item' onClick={this.handleRemove}></input>
          </div>
          )}

          <form onSubmit={this.handleSelect}>
          <div className='FormGroup' id='addbox'>
            <input className='Boxes' style={{margin: 10, width: 200, padding: 5}} name='newname' type='text'></input>
            <input className='Boxes' style={{margin: 10, width: 100, padding: 5}} name='newprice' type='number'></input>
            <input className='btn-lg btn btn-default' type='submit' value='Add'/>
          </div>
          </form>
          
          <input className='btn-lg btn btn-default' type='button' value='+ Add an item' onClick={this.handleAdd} style={{display: 'block', marginTop: 20, marginBottom: 20}}></input>
          <input className='btn-lg btn btn-default' type='submit' value='Update'/>
      
        </form>
        </div>
      </div>

    );
  }

}

export {Admin, User};

import React, { Component } from 'react';
import './App.css';
import Main from './components/mainComponent';
// import Counter from './components/counter';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux'

const store = ConfigureStore();

class App extends Component {
  render(){
    return (
      <Provider store = {store}>
      <BrowserRouter>
      <div classNameName="App">
        <Main />
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

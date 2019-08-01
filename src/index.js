import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Test from './components/Test';
import Header from './components/Header';
require('./index.css');



class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Test />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'))

export default App;
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Cs extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">haha1</h1>
                </header>
                <div><a href="/index.html">to home</a></div>
            </div>
        );
    }
}

ReactDOM.render(< Cs />, document.getElementById('root'));

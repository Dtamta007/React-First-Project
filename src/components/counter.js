import React, {Component} from 'react';


class Counter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    handleClick(){
        this.setState({count: this.state.count+1});
    }

    render(){
        return (

            <div>
                <button className="btn btn-outline-primary" onClick={(e)=>this.handleClick(e)}>click me</button>
                <p>{this.state.count}</p>

            </div>

        )
    }

}

export default Counter;
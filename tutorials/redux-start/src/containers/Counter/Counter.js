import React, { Component } from 'react';
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
// import * as actionTypes from '../../store/action/action';
import * as actionCreators from '../../store/actions/action';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter.bind(this, 10)} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter.bind(this, 10)} />
                <hr />
                <button onClick={this.props.onStoreResult.bind(this, this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((res) => {
                        return <li key={res.id} onClick={this.props.onDeleteResult.bind(this, res.id)}>{res.value}</li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: (value) => dispatch(actionCreators.add(value)),
        onSubtractCounter: (value) => dispatch(actionCreators.subtract(value)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
import React from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import Tally from './Tally';
import * as actionCreators from '../action_creators';

export const Results = React.createClass({
    render: function() {
        return <div>
            {this.props.winner
                ? <Winner ref="winner" winner={this.props.winner}/>
                : <Tally {...this.props}/>
}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    }
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);

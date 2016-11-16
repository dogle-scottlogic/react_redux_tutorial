import React from 'react';
import Winner from './Winner';
import Tally from './Tally';

export default React.createClass({
    render: function() {
        return <div>
            {this.props.winner
                ? <Winner ref="winner" winner={this.props.winner}/>
                : <Tally {...this.props}/>
}
        </div>;
    }
});

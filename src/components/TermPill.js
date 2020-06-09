import React from 'react';
import PropTypes from 'prop-types';

class TermPill extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {}
    }

    static propTypes = {
        term : PropTypes.object.isRequired
    }

    onCloseClick = (e) => {
        this.props.removeTerm(this.props.term);
    }

    render()
    {
        return (<li className={`TermPill TermPill--${this.props.term.taxonomy}`}>
            {this.props.term.name}
            <button type="button" ref={this.closeBtn} className="TermPill__close-btn" onClick={this.onCloseClick}>&times;</button>
        </li>)
    }
}

export default TermPill;
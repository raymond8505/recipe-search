import React from 'react';
import TermPicker from './TermPicker';
import PropTypes from 'prop-types';

//import ReactDOM from 'react-dom';

class Filters extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static propTypes = {
        terms : PropTypes.object.isRequired,
        addTerm : PropTypes.func.isRequired,
        chosenTerms : PropTypes.array.isRequired
    }

    renderTermPickers = () =>
    {
        let toRet = [];
        let _this = this;

        Object.keys(this.props.terms).forEach(termName => {
            toRet.push(
                <TermPicker 
                    taxonomy={_this.props.terms[termName]}
                    addTerm={_this.props.addTerm}
                    key={`filter_${_this.props.terms[termName].title}`}
                    chosenTerms={this.props.chosenTerms}
                />
            );
        });

        return toRet;
    }

    render()
    {
        return (<div className="Filters">
            <h2 className="Filters__title">
                Filters
            </h2>
            {this.renderTermPickers()}
        </div>);
    }
}

export default Filters;
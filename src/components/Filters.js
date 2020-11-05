import React from 'react';
import TermPicker from './TermPicker';
import PropTypes from 'prop-types';
import {isMobile} from '../helpers';

//import ReactDOM from 'react-dom';

class Filters extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            open : true
        };
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
    handleOpenClose = e => {

        if(isMobile())
        {
            this.setState({
                open : !this.state.open
            });
        }
    }
    render()
    {
        return (<div 
                className={`Filters ${this.state.open ? 'Filters--open' : 'Filters--closed'}`}
                >
            <h2 className="Filters__title">
                Filters
            </h2>

            <button 
                className="Filters__mobile-open-close fa fa-bars" 
                onTouchEnd={this.handleOpenClose}>

            </button>
            {this.renderTermPickers()}
        </div>);
    }
}

export default Filters;
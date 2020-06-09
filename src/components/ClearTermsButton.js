import React from 'react';
import PropTypes from 'prop-types';

class ClearTermsButton extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            taxDropDownOpen : false
        }
    }

    static propTypes = {
        clearTerms : PropTypes.func.isRequired,
        terms : PropTypes.object.isRequired
    }

    renderTaxDropDown = () => {
        //console.log(this.props.terms);

        return (<ul className={`ClearTermsButton__tax-dropdown${this.state.taxDropDownOpen ? ' ClearTermsButton__tax-dropdown--open' : ''}`}>
            {this.renderTaxDropDownItems()}
            <li className={`ClearTermsButton__tax-item ClearTermsButton__tax-item--user-text`}>
            <button 
                        type="button"
                        onClick={e => {
                            this.props.clearTerms('user-text');
                        }}
                    >Text Searches</button>
            </li>
        </ul>);
    }

    renderTaxDropDownItems = () => {

        let toRet = [];

            Object.keys(this.props.terms).forEach((term => {
                toRet.push(<li key={`rtdi_${term}`} className={`ClearTermsButton__tax-item ClearTermsButton__tax-item--${term}`}>
                    <button 
                        type="button"
                        onClick={e => {
                            this.props.clearTerms(term);
                        }}
                    >{term}</button>
                </li>)
            }))

        return toRet;
    }

    handleTypesToggleClick = (e) => {

        this.setState({taxDropDownOpen : !this.state.taxDropDownOpen});
    }

    render()
    {
        return (<div className="ClearTermsButton">
            <button 
                type="button" 
                className="ClearTermsButton__clear-btn"
                onClick={(e)=>{this.props.clearTerms();}}>
                <span className="sr-only">Clear Terms</span>
                <i className="fa fa-ban"></i>
            </button>
            <button 
                type="button" 
                className="ClearTermsButton__types-btn" 
                title="Choose a type to clear"
                onClick={this.handleTypesToggleClick}>
                <span className="sr-only">Choose a type to clear</span>
                <i className="fa fa-caret-down"></i>
            </button>
            {this.renderTaxDropDown()}
        </div>);
    }
}

export default ClearTermsButton;
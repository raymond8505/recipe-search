import React from 'react';
import PropTypes from 'prop-types';

class TermPicker extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            filter : '',
            open : true
        }
    }

    static propTypes = {
        taxonomy : PropTypes.object.isRequired,
        addTerm : PropTypes.func.isRequired,
        chosenTerms : PropTypes.array.isRequired
    }

    filterField = React.createRef();

    termIsChosen = (term) => {

        return this.props.chosenTerms.find((ct) => ct.term_id === term.term_id) !== undefined;
    }

    handleClick = (e,term) => {

        this.props.addTerm(term);
    }

    handleFilterKeyUp = (e) => {

        if(e.which === 27)
        {
            e.target.value = '';
        }
        
        this.setState({filter : e.target.value});
    }

    toggleOpen = (e) => {

        this.setState({open : !this.state.open});
    }

    renderTerms = () => {

        if(this.props.taxonomy === undefined || this.props.taxonomy === undefined) return null;
        
        //console.log(this.props);

        return this.props.taxonomy.terms.map(term => {
            return this.state.filter === '' || term.name.toLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) > -1 ? (<li 
                        key={`term_${term.term_id}`}
                        className={`TermPicker__term${this.termIsChosen(term) ? ' TermPicker__term--selected' : ''}${term.excluded ? ' TermPicker__term--excluded' : ''}`}>
                <button 
                    type="button" 
                    onClick={(e) => {
                        this.handleClick(e,term);
                    }}
                    >
                    {term.name}
                </button>
            </li>) : null;
        });
    }

    render()
    {
        //console.log(this.props.taxonomy);

        return (<div className={`TermPicker` +
                                    `${this.props.taxonomy.terms.length > 0 ? ' TermPicker--' + this.props.taxonomy.terms[0].taxonomy : ''}` + 
                                    `${this.state.open ? '' : ' TermPicker--closed'}`
                                }>
            <h3 className="TermPicker__title">
                <span className="TermPicker__title-content">{this.props.taxonomy.title}</span>
                <button className="TermPicker__toggle-btn" type="button" onClick={this.toggleOpen}>
                    <span className="sr-only">toggle visibility of this term picker</span>
                    <i className={`fa fa-chevron-${this.state.open ? 'up' : 'down'}`}></i>
                </button>
            </h3>
            <input type="text" 
                ref={this.filterField} 
                placeholder={`Search ${this.props.taxonomy.title}`} 
                className="TermPicker__filter-field"
                onKeyUp={this.handleFilterKeyUp} 
            />
            <ul className="TermPicker__terms">
                {this.renderTerms()}
            </ul>
        </div>);
    }
}

export default TermPicker;
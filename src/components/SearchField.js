import React from 'react';
import PropTypes from 'prop-types';
import TermPill from './TermPill';
import ClearTermsButton from './ClearTermsButton';
import ShareModal from './ShareModal';

class SearchField extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            shareModalOpen : false
        };
    }

    static propTypes = {
        allTerms : PropTypes.object.isRequired,
        chosenTerms : PropTypes.array.isRequired,
        addTerm : PropTypes.func.isRequired,
        removeTerm : PropTypes.func.isRequired,
        clearTerms : PropTypes.func.isRequired,
        resultsCount : PropTypes.number,
        toggleTerm : PropTypes.func.isRequired
    }

    static defaultProps = {
        resultsCount : 0
    }

    userInput = React.createRef();

    shareField = React.createRef();

    renderChosenTerms = () => {

        return this.props.chosenTerms.map(term => {
            return (<TermPill key={`term-pill_${term.term_id}`} term={term} removeTerm={this.props.removeTerm} toggleTerm={this.props.toggleTerm} />);
        });
    }

    handleKeyUp = (e) => {
        
        if(e.which === 13) //enter
        {
            this.props.addTerm(e.target.value);
            e.target.value = '';
        }
    }

    toggleShareModal = () => {

        this.setState({shareModalOpen : !this.state.shareModalOpen});
    }

    onShareModalClose = (e) => {
        this.setState({shareModalOpen : false});
    }

    displayResults = () => {

        let count = this.props.resultsCount;
        let s = count > 1 ? 's' : '';

        return count === 0 ? null : (<div className="SearchField__results-label"><span className="SearchField__results-count">{count}</span> recipe{s} found</div>);
    }

    render()
    {
        //console.log(this.props.chosenTerms);

        return (<div className="SearchField">

            <ShareModal 
                open={this.state.shareModalOpen} 
                onClose={this.onShareModalClose}
                allTerms={this.props.allTerms}
                chosenTerms={this.props.chosenTerms} />

            <button type="button" className="SearchField__share-btn" onClick={this.toggleShareModal}>
                <span className="sr-only">Share these search results</span>
                <i className="fa fa-share-alt"></i>
            </button>
            <ul className="SearchField__chosen-terms">
                {this.renderChosenTerms()}
                <li className="SearchField__user-text">
                    <input type="text" ref={this.userInput} placeholder="Enter Search" onKeyUp={this.handleKeyUp} />
                </li>
            </ul>
            
            {this.displayResults()}
            
            <ClearTermsButton terms={this.props.allTerms} clearTerms={this.props.clearTerms} />
        </div>);
    }
}

export default SearchField;
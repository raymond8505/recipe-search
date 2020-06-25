import React from 'react';
import PropTypes from 'prop-types';
import {searchTerms,elementIsIn} from '../helpers';

class SearchAutoComplete extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            matches : [],
            suggestionLimit : 15
        };
    }

    static propTypes = {
        allTerms : PropTypes.object.isRequired,
        chosenTerms : PropTypes.array.isRequired,
        onTermChosen : PropTypes.func.isRequired
    }

    input = React.createRef();
    suggestions = React.createRef();

    onInputKeyUp = (e) => {
        
        let field = e.target;
        let q = field.value;

        console.log(e.which);
            
        if(e.which === 13) // enter
        {
            this.props.onTermChosen(q);
            this.clearMatches();
        }
        else if(e.which === 27) // ESC
        {
            this.clearMatches();
        }
        else
        {
            
            let matches = searchTerms(q,this.props.allTerms);

            matches = matches.filter((match,i) => {

                if(i >= this.state.suggestionLimit) return null;

                //filter OUT any matches that are already chosen
                return this.props.chosenTerms.find(ct => {
                    return ct.term_id === match.term_id;
                }) === undefined;
            })

            this.setState({matches});
        }
        
    }
    

    componentDidMount()
    {
        window.addEventListener('click',this.onWindowClick);
    }

    componentWillUnmount()
    {
        window.removeEventListener('click',this.onWindowClick);
    }

    onWindowClick = (e) => {
        
        if(!elementIsIn(e.target,this.suggestions.current))
        {
            this.clearMatches(false,false);
        }
    }

    clearMatches = (focusSearch = true,clearInput = true) => {
        this.setState({
            matches : []
        });

        if(clearInput)
            this.input.current.value = '';
        
        if(focusSearch)
            this.input.current.focus();
    }

    onMatchClick = (e,match) => {
        
        this.props.onTermChosen(match);

        this.clearMatches();
    }

    renderSuggestions = () => {

        if(this.state.matches.length === 0) return null;

        let matches = this.state.matches;

        return (
            <ul className="SearchAutoComplete__Suggestions" ref={this.suggestions}>
                {
                    matches.map(match => {
                        return (<li key={`match_${match.term_id}`} className={`SearchAutoComplete__Suggestion SearchAutoComplete__Suggestion--${match.taxonomy}`}>
                                    <button type="button" className="SearchAutoComplete__Suggestion-btn" onClick={(e) => {this.onMatchClick(e,match)}}>{match.name}</button>
                                </li>);
                    })
                }
            </ul>
        )
    }

    onInputBlur = (e) => {

        //console.log(e.target,e.currentTarget);
        //this.setState({matches : []});
    }
    render()
    {
        return (
            <div className="SearchAutoComplete">
                <input 
                    ref={this.input}
                    type="search" 
                    className="SearchAutoComplete__input" 
                    placeholder="Search..." 
                    onKeyUp={this.onInputKeyUp}
                    onBlur={this.onInputBlur}
                    />
                {this.renderSuggestions()}
            </div>
        )
    }
}

export default SearchAutoComplete;
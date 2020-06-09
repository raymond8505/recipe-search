import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import Result from './Result';
import Loader from './Loader';

class Results extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static propTypes = {
        posts : PropTypes.array.isRequired,
        loading : PropTypes.bool
    }

    static defaultProps = {
        loading : false
    };

    renderResults = () => {

        if(this.props.posts.length === 0)
        {
            return <Alert type="error">No Recipes Found</Alert>
        }
        else
        {
            return (<ul className="Results__posts">
                {this.renderResultPosts()}
            </ul>);
        }
    }

    renderResultPosts = () => {

        return this.props.posts.map((result,i) => {
            return <Result key={`result_${i}`} result={result} />
        })
    }
    render()
    {
        //console.log(this.props.posts);

        return (<div className={`Results${this.props.posts.length === 0 ? ' Results--no-posts' : ''}`}>
            {
                this.props.loading ? <Loader /> : this.renderResults()
            }
        </div>);
    }
}

export default Results;
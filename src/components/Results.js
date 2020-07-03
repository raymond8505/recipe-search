import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import Result from './Result';
import Loader from './Loader';
import SliderBar from './SliderBar';

class Results extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            
        };
    }

    calories = {
        min : 0,
        max : 1000
    };
    ingredients = {
        min : 0,
        max : 100
    };
    servings = {
        min : 0,
        max : 10
    };
    time = {
        min : 0,
        max : 180
    };

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

    filterPosts = (calories,ingredients,servings,time) => {

        this.setState({
            calories,
            ingredients,
            servings,
            time
        });
    }

    componentWillUpdate()
    {
        /*this.setMinMax('calories');
        this.setMinMax('ingredients');
        this.setMinMax('servings');
        this.setMinMax('time');

        console.log(this);*/
    }

    setMinMax = (prop) => {

        let min = -1;
        let max = -1;

        this.props.posts.forEach(post => {

            let thisVal = post[prop];

            if(min === -1 || thisVal < min && thisVal !== -1 && thisVal !== 0)
            {
                min = thisVal;
            }

            if(max === -1 || thisVal > max)
            {
                max = thisVal;
            }
        });

        this[prop].min = min;
        this[prop].max = max;
    }

    render()
    {
        this.setMinMax('calories');
        this.setMinMax('ingredients');
        this.setMinMax('servings');
        this.setMinMax('time');

        return (<div className={`Results${this.props.posts.length === 0 ? ' Results--no-posts' : ''}`}>
            {this.props.posts.length ? <SliderBar 
                                            calories={this.calories}
                                            ingredients={this.ingredients}
                                            servings={this.servings}
                                            time={this.time}
                                            onSlidersChange={this.filterPosts}
                                        /> : null}
            {
                this.props.loading ? <Loader /> : this.renderResults()
            }
        </div>);
    }
}

export default Results;
import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';
import { minutesToTimeString } from '../helpers';

class SliderBar extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static propTypes = {

    }

    static defaultProps = {

    }

    render()
    {
        return (<div className="SliderBar">
            <Slider
                label="Calories Per Serving"
                min={this.props.calories.min}
                max={this.props.calories.max} /> 
            <Slider
                label="Ingredient Count"
                min={this.props.ingredients.min}
                max={this.props.ingredients.max} />
            <Slider
                label="Serving Count"
                min={this.props.servings.min}
                max={this.props.servings.max} />
            <Slider
                label="Total Time"
                min={this.props.time.min}
                max={this.props.time.max}
                valueFormatter={function(mins) { return minutesToTimeString(mins,'%H:%M')}} />
        </div>)
    }
}

export default SliderBar;
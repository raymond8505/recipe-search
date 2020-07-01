import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';

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
                label="Calories Per Serving" /> 
            <Slider
                label="Ingredient Count" />
            <Slider
                label="Serving Count" />
            <Slider
                label="Total Time" />
        </div>)
    }
}

export default SliderBar;
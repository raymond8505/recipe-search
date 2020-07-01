import React from 'react';
import PropTypes from 'prop-types'

class Slider extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            includeEmpty : true,
            min : this.props.min,
            max : this.props.max
        };
    }

    static propTypes = {
        min : PropTypes.number,
        max : PropTypes.number,
        label : PropTypes.string.isRequired
    };

    static defaultProps = {
        min : 0,
        max : 100
    }

    onToggleClick = (e) => {

        this.setState({includeEmpty : !this.state.includeEmpty});
    }

    render()
    {
        return (
            <div className="Slider">
                <div className="Slider__slide-val Slider__slide-val--min">
                    {this.state.min}
                </div>
                <div className="Slider__slide">
                    <h4 className="Slider__label">
                        {this.props.label}
                    </h4>
                    <button className="Slider__slide-btn Slider__slide-btn--min"></button>
                    <button className="Slider__slide-btn Slider__slide-btn--max"></button>
                </div>
                <div className="Slider__slide-val Slider__slide-val--max">
                    {this.state.max}
                </div>
                <label className="Slider__toggle">
                    <button className="Slider__toggle-btn" 
                            onClick={this.onToggleClick} 
                            title={`Items without ${this.props.label} info will${this.state.includeEmpty ? '' : ' NOT'} be included in the results`}>
                                <i className={`fa fa-toggle-${this.state.includeEmpty ? 'on' : 'off'}`}></i>
                    </button>
                </label>
            </div>);
    }
}

export default Slider;
import React from 'react';
import PropTypes from 'prop-types'

class Slider extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            includeEmpty : true,
            min : this.props.min,
            max : this.props.max,
            minX : undefined,
            maxX : undefined
        };
    }

    static propTypes = {
        min : PropTypes.number,
        max : PropTypes.number,
        valueFormatter : PropTypes.func,
        label : PropTypes.string.isRequired,
    };

    static defaultProps = {
        min : 0,
        max : 100
    }

    xPos = 0;
    currentBar;
    slider = React.createRef();
    minSlider = React.createRef();
    maxSlider = React.createRef();

    onMouseMove = (e) => {

        if(this.currentBar)
        {   
            let relativeX = this.calcRelativeX(e.clientX);
            
            if(this.currentBar === this.minSlider.current)
            {
                if(relativeX < this.state.maxX || this.state.maxX === undefined)
                {
                    this.setState({minX : relativeX});
                }
            }
            else if(this.currentBar === this.maxSlider.current)
            {
                if(relativeX > this.state.minX)
                {
                    this.setState({maxX : relativeX});
                }
            }
        }
    }

    calcRelativeX = (absX) => {
        let relX = absX - this.slider.current.offsetLeft;

        console.log(absX,relX);

        if(relX < 0)
        {
            return 0;
        }
        else if(relX > this.slider.current.offsetWidth)
        {
            return relX > this.slider.current.offsetWidth;
        }
        else
        {
            return relX;
        }
    }

    calcPercentage = (x) => {
        return x / this.slider.offsetWidth;
    }

    onSliderMouseDown = (e) => {
        this.currentBar = e.target;
    }

    onSliderMouseUp = (e) => {

        console.log('mouse up');
        this.currentBar = undefined;
    }

    onToggleClick = (e) => {

        this.setState({includeEmpty : !this.state.includeEmpty});
    }

    render()
    {
        return (
            <div className="Slider"  onMouseMove={this.onMouseMove}>
                <div className="Slider__slide-val Slider__slide-val--min">
                    {this.props.valueFormatter ? this.props.valueFormatter(this.state.min) : this.state.min}
                </div>
                <div className="Slider__slide" onMouseUp={this.onSliderMouseUp} ref={this.slider}>
                    <h4 className="Slider__label">
                        {this.props.label}
                    </h4>
                    <button 
                        className="Slider__slide-btn Slider__slide-btn--min"
                        onMouseDown={this.onSliderMouseDown}
                        style={{left : this.state.minX === undefined ? '' : this.state.minX}}
                        ref={this.minSlider}
                        ></button>
                    <button 
                        className="Slider__slide-btn Slider__slide-btn--max"
                        onMouseDown={this.onSliderMouseDown}
                        style={{left : this.state.maxX === undefined ? '' : this.state.maxX}}
                        ref={this.maxSlider}></button>
                </div>
                <div className="Slider__slide-val Slider__slide-val--max">
                    {this.props.valueFormatter ? this.props.valueFormatter(this.state.max) : this.state.max}
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
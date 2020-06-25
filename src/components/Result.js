import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import {minutesToTimeString} from '../helpers';

class Result extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            imageLoaded : false
        }
    }

    static propTypes = {
        result : PropTypes.object.isRequired
    };

    onImageLoad = (e) => {
        this.setState({imageLoaded : true});
    }
    
    maybeRenderInfo = () => {

        return this.isMissingMeta() ? this.renderInfo() : null;
    }

    renderInfo = () => {

        return [
            <button className="Result__info-button"><i class="fa fa-info-circle"></i></button>,
            this.renderInfoToolTip()    
        ];
    }

    renderInfoToolTip = () => {

        return (<div className="Result__meta-info">
            <h4 className="Result__meta-title">Details</h4>

            <dl>
                {this.maybeRenderMeta('ingredients')}
                {this.maybeRenderMeta('calories')}
                {this.maybeRenderMeta('time')}
                {this.maybeRenderMeta('servings')}
            </dl>
        </div>);
    }

    maybeRenderMeta = (key) => {

        let result = this.props.result;
        
        if(!result[key] || result[key] <= 0) return null;

        switch(key)
        {
            case 'ingredients' :
                return [
                    <dt>Ingredients</dt>,
                    <dd>{result.ingredients}</dd>
                ];
            case 'calories' :
                return [
                    <dt>Calories Per Serving</dt>,
                    <dd>{result.calories}</dd>
                ];
            case 'time' :
                return [
                    <dt>Time</dt>,
                    <dd>{minutesToTimeString(result.time)}</dd>
                ];
            case 'servings' :
                return [
                    <dt>Servings</dt>,
                    <dd>{result.servings}</dd>
                ]
        }
    }

    isMissingMeta = () => {
        
        let res = this.props.result;

        return res.calories < 0 || res.ingredients === 0 || res.servings === 0 || res.time === 0;
    }
    
    render ()
    {
        let result = this.props.result;

        return (<li className={`Result${this.state.imageLoaded ? ' Result--image-loaded' : ''}`}>
                    <a href={result.url}>
                        
                        <img 
                            src={result.thumb} 
                            alt={result.title} 
                            className="Result__thumb"
                            onLoad={this.onImageLoad} />

                        <Loader />
                        <div className="Result__info">
                            <h3 className="Result__title">
                                {result.title}
                            </h3>
                        </div> 
                    </a>
                    {this.renderInfo()}
                </li>);
    }
}

export default Result;
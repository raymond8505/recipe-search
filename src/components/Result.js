import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

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
                    </a></li>);
    }
}

export default Result;
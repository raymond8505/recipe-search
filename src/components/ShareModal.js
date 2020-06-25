import React from 'react';
import PropTypes from 'prop-types';
import {objectToURLParams} from '../helpers';

class ShareModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            url : ''
        };
    }

    shareField = React.createRef();
    url = '';

    static propTypes = {
        open : PropTypes.bool.isRequired,
        onClose : PropTypes.func,
        allTerms : PropTypes.object.isRequired,
        chosenTerms : PropTypes.array.isRequired,
    }

    static defaultProps = {
        open : false
    }
    
    componentWillUpdate()
    {
        this.url = window.location.origin + '?' + this.prepTerms(this.props.chosenTerms);
    }
    componentDidUpdate()
    {
        if(this.props.open)
        {
            let sf = this.shareField.current;

            sf.select();
            sf.focus();
        }
    }

    prepTerms = (terms) => {

        let preppedTermsObj = {};

        terms.forEach(ct => {

            if(ct.taxonomy === 'user-text')
            {
                preppedTermsObj.s = ct.term_id;
            }
            else
            {
                if(preppedTermsObj[ct.taxonomy] === undefined)
                {
                    preppedTermsObj[ct.taxonomy] = []; 
                }
                
                let excludeMod = ct.excluded ? -1 : 1;

                preppedTermsObj[ct.taxonomy].push(ct.term_id * excludeMod);
            }
        });

        //we always need the s param to trigger Wordpress search
        if(preppedTermsObj.s === undefined)
        {
            preppedTermsObj.s = '';
        }

        return objectToURLParams(preppedTermsObj);
    }

    render()
    {
        let url = encodeURIComponent(this.url);

        return (<dialog className="ShareModal" open={this.props.open}>
            <button type="button" className="ShareModal__close-share-modal" onClick={this.props.onClose}>&times;</button>
                    <h3 className="ShareModal__title">Copy the URL or click an icon to share these recipes</h3>
                    <div className="ShareModal__body">

                        <ul className="ShareModal__social-buttons">
                            <li className="ShareModal__social-button ShareModal__social-button--facebook">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer noopener"><i className="fa fa-facebook-official"></i></a>
                            </li>
                            <li className="ShareModal__social-button ShareModal__social-button--twitter">
                                <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noreferrer noopener"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li className="ShareModal__social-button ShareModal__social-button--reddit">
                                <a href={`https://www.reddit.com/submit?url=${url}&title=look at these recipes`} target="_blank" rel="noreferrer noopener"><i className="fa fa-reddit"></i></a>
                            </li>
                            <li className="ShareModal__social-button ShareModal__social-button--pinterest">
                                <a href={`https://www.pinterest.ca/pin/create/bookmarklet/?&url=${url}&description=look at these recipes`} target="_blank" rel="noreferrer noopener"><i className="fa fa-pinterest"></i></a>
                            </li>
                            <li className="ShareModal__social-button ShareModal__social-button--email">
                                <a href={`mailto:?subject=look+at+these+recipes&body=${url}`} target="_blank" rel="noreferrer noopener"><i className="fa fa-envelope-o"></i></a>
                            </li>
                        </ul>

                        <div className="ShareModal__field-shell">
                            <input type="text" readOnly ref={this.shareField} className="ShareModal__url-field" value={this.url} />
                            
                        </div>

                    </div>
                </dialog>);
    }
}

export default ShareModal;
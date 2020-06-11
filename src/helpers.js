export function isArray(obj)
{
    if(typeof obj !== 'object') return false;

    if(typeof obj === 'object' && obj.length === undefined) return false;

    return true;
}

export function objectToURLParams(obj)
{
    return Object.keys(obj).map(paramKey => {
        
        let param = obj[paramKey];

        if(isArray(param))
        {
            return paramKey + '=' + param.join(',');
        }
        else
        {
            return paramKey + '=' + param;
        }
    }).join('&');
}

export function elementIsIn(el,parent)
{
    if(el === document.body) return false;

    if(el.parentNode !== parent)
    {
        return elementIsIn(el.parentNode,parent);
    }

    return true;
}

export function getTermById(id,termsObj)
{
    let toRet = undefined;
    id = Number(id);

    Object.keys(termsObj).forEach(slug => {

        if(toRet !== undefined) return;
        
        let terms = termsObj[slug].terms;

        let term = terms.find(objTerm => {
            
            return objTerm.term_id === id;
        });

        if(term !== undefined)
        {
            toRet = term;
        }
    })

    return toRet;
}
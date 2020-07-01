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

/**
 * traverses up the DOM to check if el is a decendant of parent
 * @param {Element} el 
 * @param {Element} parent 
 * @returns {boolean}
 */
export function elementIsIn(el,parent)
{
    if(el === document.body) return false;

    if(el.parentNode !== parent)
    {
        return elementIsIn(el.parentNode,parent);
    }

    return true;
}

export function maybePlural(num,word)
{
    return num === 1 ? `${num} ${word}` : `${num} ${word}s`; 
}
/**
 * takes some integer of minutes and returns a human friend time string
 * @param {int} $raw_mins 
 * @returns {String} a time string in the format h:mm
 */
export function minutesToTimeString($raw_mins)
{
    if($raw_mins < 60) return $raw_mins + ' mins';

    let $hours = Math.floor($raw_mins / 60);

    let $mins = $raw_mins % 60;

    let $str = $hours + ' ' + maybePlural($hours,'hour');

    if($mins !== 0)  
    {
        $str += ', ' + $mins + ' ' + maybePlural($mins,'min');
    }

    return $str;
}

export function getTermById(id,termsObj)
{
    let toRet = undefined;
    id = Number(id);

    let absId = Math.abs(id);

    console.log(id,absId,termsObj);

    Object.keys(termsObj).forEach(slug => {

        if(toRet !== undefined) return;
        
        let terms = termsObj[slug].terms;

        let term = terms.find(objTerm => {
            
            return Number(objTerm.term_id) === absId;
        });

        if(term !== undefined)
        {
            toRet = term;
        }
    })

    return toRet;
}

/**
 * Search through all the terms returned from the server (App.state.terms, often passed to child components as props.allTerms)
 * enjoy the PHP style param names! ;)
 * @param {String} needle - the text by which to find matching terms
 * @param {Object} haystack - the object of arrays of term objects returned from the database. Each key in the object is the taxonomy slug for the WP_Term objects in its value array
 * @param {Boolean} includePartialMatches [default true] whether returned terms should have a name partially or exactly matching the needle
 * @param {Boolean} caseSensitive [default false] whether returned terms should match the case of the needle
 * @return {Object[]} an array of any terms whose name or description matches the needle
 */
export function searchTerms(needle,haystack,includePartialMatches = true, caseSensitive = false)
{
    let matches = [];

    needle = caseSensitive ? needle : needle.toLowerCase();

    Object.keys(haystack).forEach(tax => {
        let taxTerms = haystack[tax].terms;

        taxTerms.forEach(haystackTerm => {

            let termName = caseSensitive ? haystackTerm.name : haystackTerm.name.toLowerCase();
            let termDescription = caseSensitive ? haystackTerm.description : haystackTerm.description.toLowerCase();

            let nameMatches = includePartialMatches ? termName.indexOf(needle) > -1 : termName === needle;
            let descriptionMatches = includePartialMatches ? termDescription.indexOf(needle) > -1 : termDescription === needle;

            if(nameMatches || descriptionMatches)
            {
                matches.push(haystackTerm);
            }
        });
    });

    return matches;
}

export function makeUserTextTerm(text)
{
    let term = {
        taxonomy : 'user-text',
        name : `“${text}”`,
        term_id : text
      };
  
      return term;
}
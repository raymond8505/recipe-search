import React from 'react';
import Results from './Results';
import Filters from './Filters';
import SearchField from './SearchField';
import { objectToFormData } from 'object-to-formdata';
import Loader from './Loader';
import {getTermById} from '../helpers';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      apiLoaded : false,
      apiBase : (window.location.host === 'raymonds.recipes' ? '/recipe-search.php' : 'http://localhost/food8164/recipe-search.php'),
      terms : {},
      chosenTerms : [],
      results : [],
      resultsLoading : false,
      resultsCount : 0
    };
  }


  componentWillMount()
  {
    let _this = this;


    this.apiFetch('init',(resp => {
      
      //console.log(resp);

      _this.setState({
        terms : resp,
        chosenTerms : [
          //resp.ingredients.terms[0],
          //resp.cuisines.terms[0],
          //resp.courses.terms[0],
          //resp.categories.terms[0]
        ]
      },()=>{

        let urlParams = new URLSearchParams(window.location.search);
        let allTerms = resp;
        let chosenTerms = [];

        urlParams.forEach((val,key) => {
          
          if(key === 's')
          {
            if(val.length > 0)
            {
              chosenTerms.push(this.makeUserTextTerm(val));
            }
          }
          else
          {
            let urlVals = val.split(',');

            urlVals.forEach(keyVal => {
              chosenTerms.push(getTermById(keyVal,allTerms));
            })
          }
        });

        console.log(chosenTerms);

        _this.setState({chosenTerms},() => {
            if(this.state.chosenTerms.length > 0)
            {
              
              this.updateResults();
            }
        });

        

      });

      
    }));
    
    // let lastTen = this.getRecipesWithIngredient([1200,2280],posts => {
    //   console.log(posts);
    // },{tax_relation : 'AND'});
  }

  getPosts = (params,cb) => {
    this.apiFetch('posts',cb,params);
  }

  getRecipes = (params,cb) => {
    this.apiFetch('wprm_recipe',cb,params);
  }

  getRecipesWithIngredient = (id,cb,params) => {

    params = params === undefined ? {} : params;
    params.wprm_ingredient = id;

    this.getRecipes(params,cb);
  }
  
  isObject = (val) => {

    return typeof val == 'object' && val.length === undefined;
  }

  isArray = (val) => {
    return typeof val == 'object' && val.length !== undefined;
  }

  makeAPIFormData = (obj) => {

    let fd = new FormData();

    if(obj === undefined || obj === null) return fd;

    let keys = Object.keys(obj);

    if(keys.length === 0) return fd;

    keys.forEach(key => {

      fd.append(key,obj[key]);

    });

    return fd;
  }

  async apiFetch (endpoint,callback,params) {

    await fetch(`${this.state.apiBase}?action=${endpoint}`,{
      method : 'POST',
      body : objectToFormData(params),
      headers : []
    }).then(resp => {
      
      resp.json().then(json => {
        callback(json);
      });

    });
  }

  addTerm = (term) => {
    
    term = typeof term == 'string' ? this.makeUserTextTerm(term) : term;

    if(this.termIsChosen(term))
    {
      this.removeTerm(term);
    }
    else
    {
      let chosenTerms = this.state.chosenTerms;
      chosenTerms.push(term);
      this.setState({chosenTerms},this.updateResults);
    }
  }

  removeTerm = (term) => {

    let chosenTerms = this.state.chosenTerms.filter(ct => {
      return ct.term_id !== term.term_id;
    });

    this.setState({chosenTerms},this.updateResults);
  }

  updateResults = () => {

    console.log(this.state.chosenTerms);

    if(this.state.chosenTerms === undefined || this.state.chosenTerms.length === 0) return;

    let toSend = this.compressTerms(this.state.chosenTerms);

    //console.log(toSend);

    this.setState({resultsLoading : true});

    this.searchRecipes(toSend,this.handleSearchResults);

  }

  searchRecipes = (toSend,cb) => {

    this.apiFetch('search',cb,toSend);
  }

  handleSearchResults = (data) => {

    data = JSON.parse(data);

    this.setState(
      {
        resultsLoading : false,
        results : data,
        resultsCount : data.length
      });
  }

  compressTerms = (terms) => {

    let taxTerms = {};
    let searchTerms = [];

    terms.forEach(term => {

      if(term.taxonomy === 'user-text')
      {
        if(!searchTerms.includes(term.term_id))
        {
          searchTerms.push(term.term_id);
        }
      }
      else
      {
        if(taxTerms[term.taxonomy] === undefined)
        {
          taxTerms[term.taxonomy] = [];
        }

        if(!taxTerms[term.taxonomy].includes(term.term_id))
        {
          taxTerms[term.taxonomy].push(term.term_id);
        }
      }
    })

    return {
      terms : taxTerms,
      text : searchTerms
    };
  }

  makeUserTextTerm = (text) =>
  {
    let term = {
      taxonomy : 'user-text',
      name : `“${text}”`,
      term_id : text
    };

    return term;
  }

  termIsChosen = (term) => {

      return this.state.chosenTerms.find((ct) => ct.term_id === term.term_id) !== undefined;
  }

  clearTerms = (type) => {
    
    let chosenTerms = [];

    if(type !== undefined)
    {
      let tax = type === 'user-text' ? 'user-text' : this.getTaxSlug(type);

      chosenTerms = this.state.chosenTerms.filter(term => {
        return term.taxonomy !== tax;
      });
      
    }

    this.setState({chosenTerms},this.updateResults);
  }

  getTaxSlug(termsTax)
  {
    let taxTerms = this.state.terms[termsTax];

    if(!taxTerms || !taxTerms.terms || taxTerms.terms.length === 0) return null;

    return taxTerms.terms[0].taxonomy;
  }
  

  render()
  {
    if(Object.keys(this.state.terms).length > 0)
    {
      return (<div className="App App--Recipe-Search">
        <div className="App__header">
          <div className="App__title">
            <a href="/">Raymond's Food</a>
          </div>
          <div className="App__search-field">
            <SearchField
              allTerms={this.state.terms}
              chosenTerms={this.state.chosenTerms}
              addTerm={this.addTerm}
              removeTerm={this.removeTerm}
              clearTerms={this.clearTerms}
              resultsCount={this.state.resultsCount}
            />
          </div>
          <div className="App__header-links">
            <ul id="menu-main-menu" className="menu">
              <li id="menu-item-59731" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-59731">
                <a href="https://raymonds.recipes/ingredients-index/">Ingredients Index</a>
              </li>
              <li id="menu-item-60839" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-60839">
                <a href="https://raymonds.recipes/browse/">Browse</a>
              </li>
            </ul>

            <ul className="main-header__socials">
                <li className="main-header__social main-header__social--instagram">
                    <a href="https://www.instagram.com/raymonds_food/" target="_blank"  rel="noopener noreferrer"><i className="fa fa-instagram" aria-hidden="true" role="presentation"></i><span className="sr-only">Follow me on Instagram</span></a>
                </li>
                <li className="main-header__social main-header__social--pinterest">
                    <a href="https://www.pinterest.ca/raymond8505/raymonds-food/" target="_blank"  rel="noopener noreferrer"><i className="fa fa-pinterest" aria-hidden="true" role="presentation"></i><span className="sr-only">Follow me on Instagram</span></a>
                </li>
            </ul>
          </div>
        </div>

        
        <Filters
          terms={this.state.terms}
          chosenTerms={this.state.chosenTerms}
          addTerm={this.addTerm}
           />
        <Results 
          posts={this.state.results}
          loading={this.state.resultsLoading}
          
        />
        

      </div>);
    }
    else
    {
      return <div className="App App--Recipe-Search"><Loader /></div>;
    }
    
  }
}

export default App;
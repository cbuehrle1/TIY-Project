if (window.FC === undefined) { window.FC = {}; }

(() => {

  class RecipeSearchComponent extends React.Component {

    constructor() {
      super()
      this.state = { baseUri: "",
      results: [],
      form: true,
      offset: 1
      }
      this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight) {
        var queryStr = this.queryInput.value;
        var offsetAmt = this.state.offset;

        $.ajax({
          url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&offset=" + offsetAmt + "&query=" + queryStr,
          type: 'GET',
        	beforeSend: function (xhr) {
        		xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
            xhr.setRequestHeader("Accept", "application/json");
        	}
        })
        .done((data) => {
          var concatRecipes = this.state.results.concat(data.results);

          this.setState({
            baseUri: data.baseUri,
            results: concatRecipes,
            form: false,
            offset: this.state.offset + 10
          });
        });
      }
    }

    callSearch(evt) {
      evt.preventDefault();
      var queryStr = this.queryInput.value;
      console.log(this.queryInput.value);
      $.ajax({
      	url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&offset=0&query=" + queryStr,
      	type: 'GET',
      	beforeSend: function (xhr) {
      		xhr.setRequestHeader("X-Mashape-Key", "lfLi0pd5ComshP5lbLvR2GHC5uP6p1b7AOujsnP5aI9GJrDgG1");
          xhr.setRequestHeader("Accept", "application/json");
      	}
      })
      .done((data) => {

        this.setState({
          baseUri: data.baseUri,
          results: data.results,
          form: false,
          offset: this.state.offset
        });

      })

    }


    render() {

      var searchForm;
      var searchResults;
      var imageUrl;

      if (this.state.form === true) {
        searchForm = <form><input ref={(input) => { this.queryInput = input }} placeholder="Search" /><button onClick={(evt) => { this.callSearch(evt); }}>Search</button></form>
      } else if (this.state.form === false) {
        imageUrl = this.state.baseUri
        searchForm = <form><input ref={(input) => { this.queryInput = input }} placeholder="Search" /><button onClick={(evt) => { this.callSearch(evt); }}>Search</button></form>
        searchResults = <div><h1>Search results for "{this.queryInput.value}"</h1>
         <ul className="search-results">
          {this.state.results.map((recipe) => {
            return <li key={recipe.id}><img src={imageUrl + recipe.image} />
            <p>{recipe.title}</p><p>Ready in {recipe.readyInMinutes} minutes</p></li>
          })}
         </ul>
         </div>
      }

      return <div className="search-container">{searchForm}{searchResults}</div>
    }
  }

  FC.RecipeSearchComponent = RecipeSearchComponent;
})()

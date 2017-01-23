if (window.FC === undefined) { window.FC = {}; }

(() => {

  class NavBar extends React.Component {

    constructor() {
      super();
      this.state = { user: {
        displayName: ""
      }, sidebar: "main-landing",
      height: window.innerHeight,
      diet: []
      }
    }

    componentDidMount() {

      var user;
      var getDiet = (user) => {
        user = user
        $.ajax({
          url: "/api/diet"
        })
        .done((data) => {
          cb(data, user)
        });
      }

      var cb = (data, user) => {
        console.log(user, data);
        this.setState({
          user: user,
          sidebar: this.state.sidebar,
          height: window.innerHeight,
          diet: data
        });
      }

      $.ajax({
        url: "/api/user"
      })
      .done(function(data) {
        getDiet(data);
      });

    }

    moveToSideBar() {
      this.props.callback();
      this.setState({
        user: this.state.user,
        sidebar: "side-bar"
      });
    }

    render() {
      var navBar;
      var top = (this.state.height/2) - 151;
      var theHeight = this.state.height - 36;

      if (this.state.sidebar === "side-bar") {
        navBar = <div className={this.state.sidebar} style={ { height: theHeight } }>
          <h1>{this.state.user.displayName + "'"}s Pairings</h1>
        </div>
      } else {
        navBar = <div className={this.state.sidebar} style={ { height: theHeight } }><div style={{ width: "620px", margin: "0 auto", paddingTop: top }}><h1>Welcome {this.state.user.displayName}</h1>
        <p>This is an app designed around food pairing. Press Enter to start exploring new custom recipies today!</p>
        <div className="start-button" onClick={() => { this.moveToSideBar(); }}>Enter</div></div>
        </div>;
      }

      return <div>{navBar}</div>
    }


  }

  FC.NavBar = NavBar
})()

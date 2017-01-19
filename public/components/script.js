"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var AppComponent = function (_React$Component) {
    _inherits(AppComponent, _React$Component);

    function AppComponent() {
      _classCallCheck(this, AppComponent);

      return _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).apply(this, arguments));
    }

    _createClass(AppComponent, [{
      key: "renderChildren",
      value: function renderChildren() {
        this.setState({
          show: true,
          appHeader: "app-header"
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var children;
        var headerStyle;
        var headerLinks;

        if (this.state !== null && this.state.show === true) {
          children = this.props.children;
          headerStyle = this.state.appHeader;
          headerLinks = React.createElement(
            "ul",
            { className: "ul-left" },
            React.createElement(
              "li",
              { className: "left-header-li" },
              React.createElement(
                ReactRouter.Link,
                { to: "/" },
                "Chads App"
              )
            ),
            React.createElement(
              "li",
              { className: "left-header-li" },
              React.createElement(
                ReactRouter.Link,
                { to: "/RecipeSearch" },
                "Search Recipes"
              )
            )
          );
        } else if (this.state === null) {
          headerStyle = "app-header-main";
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "header",
            { className: headerStyle },
            React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "/logout" },
                  "logout"
                )
              )
            ),
            headerLinks
          ),
          React.createElement(FC.NavBar, { callback: function callback() {
              _this2.renderChildren();
            } }),
          children
        );
      }
    }]);

    return AppComponent;
  }(React.Component);

  FC.AppComponent = AppComponent;
})();
//# sourceMappingURL=script.js.map

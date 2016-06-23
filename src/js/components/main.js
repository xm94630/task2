require("../css/common.css");

//依赖
var name = require('./name.js');

//组件demo
var Xm = React.createClass({displayName: "Xm",
  getInitialState:function(){
    return {
      say:'Hello,'+name
    }
  },
  myChange:function(){
    this.setState({
      say:event.target.value
    })
  },
  getDefaultProps:function(){
    return {
      love:'小玉'
    }
  },
  propTypes:{
    love:React.PropTypes.string.isRequired
  },
  render: function() {
    var text = this.state.say;
    return (
      React.createElement("div", null, 
        React.createElement("input", {ref: "xxx", onChange: this.myChange, value: text}), 
        React.createElement("div", null, text)
      )
    );
  }
});
React.render(
  React.createElement(Xm, null),
  document.getElementById('example')
);

//ES6
function foo() {
  var a = 'es6';
  if(true){
    let a = 'es5';
  }
  console.log(a);
}
foo();
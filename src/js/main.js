var name = require('./name.js');

var Xm = React.createClass({displayName: "Xm",
  getInitialState:function(){
    return {
      say:name
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
import React from 'react';

class BasicInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          text: ''
      }
    }

    render() {
        return (
        <input
        className="login-button"
        placeholder={this.props.text}/>
        )
    }
}
export default BasicInput;
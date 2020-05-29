import React from 'react';

class BasicButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          text: ''
      }
    }

    render() {
        return (
        <button
        className="login-button">
            {this.props.text}
        </button>
        )
    }
}
export default BasicButton;
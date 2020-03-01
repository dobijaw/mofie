import React, { Component } from 'react';

const withCollapse = WrappedElement => {
  return class WithCollapse extends Component {
    state = {
      isCollapsed: false,
    };

    toggle = () => {
      this.setState(prevState => {
        return { isCollapsed: !prevState.isCollapsed };
      });
    };

    render() {
      const { isCollapsed } = this.state;

      return <WrappedElement isCollapsed={isCollapsed} toggle={this.toggle} />;
    }
  };
};

export default withCollapse;

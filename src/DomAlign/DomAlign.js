/* global window */
/* eslint react/no-find-dom-node: 0 */
// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import domAlign from 'dom-align';
import rafThrottle from 'raf-throttle';

class DomAlign extends React.Component<
  {
    children: React.Element<any>,
    config: Object, // docs: https://github.com/yiminghe/dom-align#config-object-details
    target: React.ElementRef<any>,
    resize?: boolean,
  },
  {
    source: React.ElementRef<any>,
  },
> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    config: PropTypes.object.isRequired,
    target: PropTypes.object,
    resize: PropTypes.bool,
  };
  static defaultProps = {
    target: undefined,
    resize: false,
  };
  state = { source: undefined };
  componentDidMount() {
    this.align();
    if (this.props.resize) {
      window.addEventListener('resize', this.align);
    }
  }
  componentDidUpdate() {
    // TODO: make it async. there is a problem of overlay in dialog case.
    setTimeout(() => {
      this.align();
    }, 0);
  }
  componentWillUnmount() {
    if (this.props.resize) {
      window.removeEventListener('resize', this.align);
    }
    if (this.align && this.align.cancel) {
      this.align.cancel();
    }
  }
  onSourceRef = (source: React.ElementRef<any>) => {
    this.setState({ source });
  };
  align = rafThrottle(() => {
    const { target, config } = this.props;
    const { source } = this.state;

    if (target && source) {
      // Note: Wait for two react instance ready.
      domAlign(findDOMNode(source), findDOMNode(target), config);
    }
  });
  render() {
    const { children } = this.props;
    const { onSourceRef } = this;

    return React.cloneElement(React.Children.only(children), {
      ref: onSourceRef,
    });
  }
}

export default DomAlign;

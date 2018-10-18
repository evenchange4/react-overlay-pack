/* global document */
/* eslint react/no-find-dom-node: 0 */
// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import rafThrottle from 'raf-throttle';

export type Props = {
  children: React.Node,
  onClick: (e: any) => void,
};

class ClickOutside extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClickOutside = rafThrottle((e: any) => {
    const { onClick } = this.props;
    const node = findDOMNode(this);
    if (node && node.contains(e.target)) return; // Node: Omit clicking itself.

    onClick(e);
  });

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    document.addEventListener('touchend', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('touchend', this.handleClickOutside, true);

    if (this.handleClickOutside && this.handleClickOutside.cancel) {
      this.handleClickOutside.cancel();
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ClickOutside;

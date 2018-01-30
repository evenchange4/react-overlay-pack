/* eslint react/no-find-dom-node: 0 */
// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Transition from '../Transition';
import Portal from '../Portal';
import DomAlign from '../DomAlign';
import ClickOutside from '../ClickOutside';
import emptyFunction from '../utils/emptyFunction';

class Overlay extends React.Component<{
  children: any,
  onOutsideClick?: (e: any) => void,
  target?: React.ElementRef<any>,
  alignConfig: Object,
  transitionConfig?: Object,
  resize?: boolean,
}> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onOutsideClick: PropTypes.func, // Note: for root close
    target: PropTypes.object,
    alignConfig: PropTypes.object, // docs: https://github.com/yiminghe/dom-align#alignconfig-object-details
    transitionConfig: PropTypes.object, // docs: https://github.com/react-component/tween-one
    resize: PropTypes.bool,
  };
  static defaultProps = {
    onOutsideClick: emptyFunction,
    alignConfig: {
      points: ['tr', 'br'], // bottom-right
      offset: [0, 0],
    },
    transitionConfig: {
      // From
      style: {
        opacity: 0,
      },
      // To
      animation: {
        opacity: 1,
      },
    },
    resize: false,
  };
  onOutsideClick = (e: any) => {
    const node = findDOMNode(this.props.target);
    if (node && node.contains(e.target)) return; // Note: Omit clicking target.

    if (this.props.onOutsideClick) {
      this.props.onOutsideClick(e);
    }
  };

  render() {
    const {
      alignConfig,
      target,
      transitionConfig,
      children,
      resize,
    } = this.props;
    const { onOutsideClick } = this;

    return (
      <Portal>
        <ClickOutside onClick={onOutsideClick}>
          <DomAlign config={{ ...alignConfig }} target={target} resize={resize}>
            <Transition {...transitionConfig} component={false}>
              {React.cloneElement(children, {
                style: { ...children.props.style, position: 'absolute' },
              })}
            </Transition>
          </DomAlign>
        </ClickOutside>
      </Portal>
    );
  }
}

export default Overlay;

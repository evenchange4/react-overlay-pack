/* eslint react/no-find-dom-node: 0 */
// @flow

import * as React from 'react';
import omit from 'ramda/src/omit';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Transition from '../Transition';
import Portal from '../Portal';
import DomAlign from '../DomAlign';
import ClickOutside from '../ClickOutside';
import emptyFunction from '../utils/emptyFunction';

class Overlay extends React.Component<{
  show: boolean,
  children: any,
  onOutsideClick?: (e: any) => void,
  target?: React.ElementRef<any>,
  alignConfig: Object,
  transitionConfig?: Object,
  resize?: boolean,
  style?: Object,
}> {
  static propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onOutsideClick: PropTypes.func, // Note: for root close
    target: PropTypes.object,
    alignConfig: PropTypes.object, // docs: https://github.com/yiminghe/dom-align#alignconfig-object-details
    transitionConfig: PropTypes.object, // docs: https://github.com/react-component/tween-one
    resize: PropTypes.bool,
  };
  static defaultProps = {
    show: false,
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
      show,
      alignConfig,
      target,
      transitionConfig,
      children,
      resize,
      style,
      ...otherProps
    } = this.props;
    const { onOutsideClick } = this;

    return (
      show && (
        <Portal>
          <ClickOutside onClick={onOutsideClick}>
            <DomAlign
              config={{ ...alignConfig }}
              target={target}
              resize={resize}
            >
              <div
                style={{ position: 'absolute', ...style }}
                {...omit(['onOutsideClick'])(otherProps)}
              >
                <Transition {...transitionConfig} component={false}>
                  {children}
                </Transition>
              </div>
            </DomAlign>
          </ClickOutside>
        </Portal>
      )
    );
  }
}

export default Overlay;

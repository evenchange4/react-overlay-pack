// @flow
import * as React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Transition from '../Transition';
import Portal from '../Portal';
import DomAlign from '../DomAlign';
import ClickOutside from '../ClickOutside';
import emptyFunction from '../utils/emptyFunction';

type Props = {
  show: boolean,
  children: React.Node,
  onOutsideClick?: (e: any) => void,
  target: React.ElementRef<*>,
  alignConfig: Object,
  transitionConfig?: Object,
  resize?: boolean,
  style?: Object,
};

class Overlay extends React.Component<Props> {
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
    const { target, onOutsideClick } = this.props;
    if (target.current && target.current.contains(e.target)) return; // Note: Omit clicking target.

    if (onOutsideClick) {
      onOutsideClick(e);
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
                {...R.omit(['onOutsideClick'])(otherProps)}
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

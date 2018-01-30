// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import Transition from '../Transition';
import ClickOutside from '../ClickOutside';
import emptyFunction from '../utils/emptyFunction';

const Container = (props: { children?: React.Node }) => (
  <div
    {...props}
    style={{
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      overflow: 'auto',
    }}
  />
);

const BackdropContainer = ({
  style,
  ...otherProps
}: {
  style?: Object,
  children?: React.Node,
}) => (
  <div
    {...otherProps}
    style={{
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      overflow: 'auto',
      ...style,
    }}
  />
);

const Dialog = ({
  onOutsideClick,
  children,
  backdropTransition,
  containerTransition,
}: {
  children: React.Node,
  onOutsideClick: Function,
  backdropTransition?: Object,
  containerTransition?: Object,
}) => (
  <React.Fragment>
    <Portal>
      <Transition component={BackdropContainer} {...backdropTransition} />
    </Portal>
    <Portal>
      <Container>
        <ClickOutside onClick={onOutsideClick}>
          <Transition component={false} {...containerTransition}>
            {children}
          </Transition>
        </ClickOutside>
      </Container>
    </Portal>
  </React.Fragment>
);

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func,
  backdropTransition: PropTypes.any,
  containerTransition: PropTypes.any,
};
Dialog.defaultProps = {
  onOutsideClick: emptyFunction,
  backdropTransition: {
    style: {
      opacity: 0.3,
    },
    animation: {
      ease: 'easeOutCubic',
      duration: 200,
      delay: 0,
      opacity: 1,
    },
  },
  containerTransition: {
    style: {
      transform: 'translateY(-20px)',
    },
    animation: {
      ease: 'easeOutQuart',
      duration: 200,
      delay: 0,
      translateY: 0,
    },
  },
};

export default Dialog;

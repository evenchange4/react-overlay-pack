// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import Transition from '../Transition';
import ClickOutside from '../ClickOutside';
import emptyFunction from '../utils/emptyFunction';
import { BackdropContainer, Container } from './Components';

export type Props = {
  show: boolean,
  children: React.Node,
  onOutsideClick: Function,
  backdropTransition?: Object,
  containerTransition?: Object,
};

const Dialog = ({
  show,
  children,
  onOutsideClick,
  backdropTransition,
  containerTransition,
}: Props) =>
  show && (
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
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func,
  backdropTransition: PropTypes.any,
  containerTransition: PropTypes.any,
};
Dialog.defaultProps = {
  show: false,
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

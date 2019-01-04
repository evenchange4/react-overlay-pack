// @flow
import * as React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import Transition from '../Transition';
import emptyFunction from '../utils/emptyFunction';
import { BackdropContainer, Container } from './Components';

export type Props = {
  show: boolean,
  children: React.Element<any>,
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
        <Transition component={false} {...backdropTransition}>
          <BackdropContainer onClick={onOutsideClick} />
        </Transition>

        <Container>
          <Transition component={false} {...containerTransition}>
            {/* TODO: a better way to merge child style */}
            {React.cloneElement(children, {
              style: {
                pointerEvents: 'all',
                ...R.path(['props', 'style'], children),
              },
            })}
          </Transition>
        </Container>
      </Portal>
    </React.Fragment>
  );

Dialog.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func,
  backdropTransition: PropTypes.shape({
    style: PropTypes.object,
    animation: PropTypes.object,
  }),
  containerTransition: PropTypes.shape({
    style: PropTypes.object,
    animation: PropTypes.object,
  }),
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

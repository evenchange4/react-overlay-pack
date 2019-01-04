/* eslint react/no-multi-comp: 0 */
// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dialog from '.';
import Overlay from '../Overlay';

class MenuOverlay extends React.Component<{||}, { show: boolean }> {
  state = { show: false };

  target = React.createRef();

  onClick = () => this.setState(({ show }) => ({ show: !show }));

  onHide = () => this.setState({ show: false });

  render() {
    const { show } = this.state;
    const { onClick, onHide, target } = this;

    return (
      <div>
        <div
          ref={target}
          onClick={onClick}
          onKeyPress={onClick}
          style={{ backgroundColor: 'antiquewhite' }}
          role="button"
          tabIndex="0"
        >
          Click me
        </div>

        <Overlay show={show} target={target} onOutsideClick={onHide}>
          <div key="menu" style={{ width: 300, backgroundColor: 'aliceblue' }}>
            <div
              onClick={action('click 1')}
              onKeyPress={action('click 1')}
              role="button"
              tabIndex="0"
            >
              Item 1
            </div>
            <div
              onClick={action('click 2')}
              onKeyPress={action('click 2')}
              role="button"
              tabIndex="0"
            >
              Item 2
            </div>
          </div>
        </Overlay>
      </div>
    );
  }
}

class StatefulDialog extends React.Component<
  { containerTransition?: Object },
  { show: boolean },
> {
  state = { show: false };

  onClick = () => this.setState(({ show }) => ({ show: !show }));

  onHide = () => this.setState({ show: false });

  render() {
    const { show } = this.state;
    const { containerTransition } = this.props;
    const { onClick, onHide } = this;

    return (
      <div>
        <span
          onClick={onClick}
          onKeyPress={onClick}
          style={{ backgroundColor: 'antiquewhite' }}
          role="button"
          tabIndex="0"
        >
          Open dialog
        </span>

        <Dialog
          show={show}
          onOutsideClick={onHide}
          containerTransition={containerTransition}
        >
          <div key="div" style={{ width: 300, backgroundColor: 'aliceblue' }}>
            This is content.
            <MenuOverlay />
          </div>
        </Dialog>
      </div>
    );
  }
}

storiesOf('Dialog', module)
  .add('API', () => <StatefulDialog />, {
    info: {
      text: 'Basic',
      inline: true,
      propTables: [Dialog],
    },
  })
  .add(
    'Custom transition',
    () => (
      <StatefulDialog
        containerTransition={{
          style: {
            transform: 'translateY(20px)',
          },
          animation: {
            ease: 'easeOutBounce',
            duration: 200,
            delay: 0,
            translateY: 40,
          },
        }}
      />
    ),
    {
      info: {
        text: 'with containerTransition props',
        inline: true,
        propTables: [Dialog],
      },
    },
  );

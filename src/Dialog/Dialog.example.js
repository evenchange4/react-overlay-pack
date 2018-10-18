/* eslint react/no-multi-comp: 0 */
// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Dialog from '.';
import Overlay from '../Overlay';

class MenuOverlay extends React.Component<
  { menuRef: React.ElementRef<*> },
  { show: boolean },
> {
  state = { show: false };

  target = React.createRef();

  onClick = () => this.setState(({ show }) => ({ show: !show }));

  onHide = () => this.setState({ show: false });

  render() {
    const { show } = this.state;
    const { onClick, onHide, target } = this;
    const { menuRef } = this.props;

    return (
      <div>
        <div
          ref={target}
          onClick={onClick}
          onKeyPress={onClick}
          style={{ backgroundColor: 'antiquewhite' }}
        >
          Click me
        </div>

        <Overlay show={show} target={target} onOutsideClick={onHide}>
          <div
            key="menu"
            ref={menuRef}
            style={{ width: 300, backgroundColor: 'aliceblue' }}
          >
            <div onClick={action('click 1')} onKeyPress={action('click 1')}>
              Item 1
            </div>
            <div onClick={action('click 2')} onKeyPress={action('click 2')}>
              Item 2
            </div>
          </div>
        </Overlay>
      </div>
    );
  }
}

class StatefulDialog extends React.Component<
  {
    containerTransition?: Object,
  },
  {
    show: boolean,
  },
> {
  state = { show: false };

  overlay = React.createRef();

  onClick = () => this.setState(({ show }) => ({ show: !show }));

  onHide = (e: SyntheticEvent<any>) => {
    const overlay = this.overlay.current;
    // Hint: Omit clicking overlay.
    if (overlay && overlay.contains(e.target)) return; // Node: Omit clicking itself.
    this.setState({ show: false });
  };

  render() {
    const { show } = this.state;
    const { containerTransition } = this.props;
    const { overlay, onClick, onHide } = this;

    return (
      <div>
        <span
          onClick={onClick}
          onKeyPress={onClick}
          style={{ backgroundColor: 'antiquewhite' }}
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
            <MenuOverlay menuRef={overlay} />
          </div>
        </Dialog>
      </div>
    );
  }
}

storiesOf('Dialog', module)
  .add(
    'API',
    withInfo({
      text: 'Basic',
      inline: true,
      propTables: [Dialog],
    })(() => <StatefulDialog />),
  )
  .add(
    'Custom transition',
    withInfo({
      text: 'with containerTransition props',
      inline: true,
      propTables: [Dialog],
    })(() => (
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
    )),
  );

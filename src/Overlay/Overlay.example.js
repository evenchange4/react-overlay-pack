/* eslint react/no-multi-comp: 0 */
// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Overlay from '.';

class BasicOverlay extends React.Component<
  {},
  {
    show: boolean,
    target?: React.ElementRef<any>,
  },
> {
  state = { show: true, target: undefined };
  onMouseEnter = () => this.setState({ show: !this.state.show });
  onHide = () => this.setState({ show: false });
  onTargetRef = target => this.setState({ target });
  render() {
    const { show, target } = this.state;
    const { onMouseEnter, onHide, onTargetRef } = this;

    return (
      <div>
        <span
          ref={onTargetRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onHide}
          style={{ backgroundColor: 'antiquewhite' }}
        >
          Hover me
        </span>

        {show && (
          <Overlay target={target} {...this.props}>
            <div key="div" style={{ width: 300, backgroundColor: 'aliceblue' }}>
              This is overlay content.
            </div>
          </Overlay>
        )}
      </div>
    );
  }
}

class MenuOverlay extends React.Component<
  {},
  {
    show: boolean,
    target?: React.ElementRef<any>,
  },
> {
  state = { show: false, target: undefined };
  onClick = () => this.setState({ show: !this.state.show });
  onHide = () => this.setState({ show: false });
  onTargetRef = target => this.setState({ target });
  render() {
    const { show, target } = this.state;
    const { onClick, onHide, onTargetRef } = this;

    return (
      <div>
        <div
          ref={onTargetRef}
          onClick={onClick}
          onKeyPress={onClick}
          style={{ backgroundColor: 'antiquewhite' }}
        >
          Click me
        </div>

        {show && (
          <Overlay target={target} onOutsideClick={onHide} {...this.props}>
            <div
              key="menu"
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
        )}
      </div>
    );
  }
}

storiesOf('Overlay', module)
  .add(
    'Basic',
    withInfo({
      text: 'state = { show: true }',
      inline: true,
      propTables: [Overlay],
    })(() => (
      <BasicOverlay alignConfig={{ points: ['cl', 'cr'], offset: [5, 0] }} />
    )),
  )
  .add(
    'Dropdown',
    withInfo({
      text: 'With onHide function for rootClose',
      inline: true,
      propTables: [Overlay],
    })(() => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <MenuOverlay
          alignConfig={{ points: ['tl', 'bl'], offset: [0, 0] }}
          transitionConfig={{
            animation: {
              translateY: 0,
              opacity: 1,
            },
            style: {
              transform: 'translateY(-10px)',
              opacity: 0,
            },
          }}
        />
        <MenuOverlay
          alignConfig={{ points: ['tc', 'bc'], offset: [0, 0] }}
          transitionConfig={{
            animation: {
              translateX: 0,
              translateY: 0,
              ease: 'easeOutBounce',
              duration: 600,
            },
            style: {
              transform: 'translate(-20px, -20px)',
            },
          }}
        />
        <MenuOverlay
          resize
          alignConfig={{ points: ['cr', 'cl'], offset: [-8, 0] }}
          transitionConfig={{
            style: {
              transform: 'translateX(8px)',
            },
            animation: {
              translateX: 0,
              ease: 'easeOutQuart',
            },
          }}
        />
      </div>
    )),
  );

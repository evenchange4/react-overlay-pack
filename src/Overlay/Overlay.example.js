/* eslint react/no-multi-comp: 0 */
// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Overlay from '.';

class BasicOverlay extends React.Component<{}, { show: boolean }> {
  state = { show: true };

  target = React.createRef();

  onMouseEnter = () => this.setState(({ show }) => ({ show: !show }));

  onHide = () => this.setState({ show: false });

  render() {
    const { show } = this.state;
    const { onMouseEnter, onHide, target } = this;

    return (
      <div>
        <span
          ref={target}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onHide}
          style={{ backgroundColor: 'antiquewhite' }}
        >
          Hover me
        </span>

        <Overlay show={show} target={target} {...this.props}>
          <div key="div" style={{ width: 300, backgroundColor: 'aliceblue' }}>
            This is overlay content.
          </div>
        </Overlay>
      </div>
    );
  }
}

class MenuOverlay extends React.Component<{}, { show: boolean }> {
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

        <Overlay
          show={show}
          target={target}
          onOutsideClick={onHide}
          {...this.props}
        >
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

storiesOf('Overlay', module)
  .add(
    'Basic',
    () => (
      <BasicOverlay alignConfig={{ points: ['cl', 'cr'], offset: [5, 0] }} />
    ),
    {
      info: {
        text: 'state = { show: true }',
        inline: true,
        propTables: [Overlay],
      },
    },
  )
  .add(
    'Dropdown',
    () => (
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
    ),
    {
      info: {
        text: 'With onHide function for rootClose',
        inline: true,
        propTables: [Overlay],
      },
    },
  );

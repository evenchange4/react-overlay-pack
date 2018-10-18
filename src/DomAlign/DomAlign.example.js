// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DomAlign from './DomAlign';

class Component extends React.Component<{
  config: Object,
}> {
  target = React.createRef();

  render() {
    const { config } = this.props;
    const { target } = this;
    return (
      <React.Fragment>
        <div
          ref={target}
          style={{ backgroundColor: 'antiquewhite', height: 100, width: 100 }}
        >
          Target node
        </div>

        <DomAlign config={config} target={target}>
          <div style={{ backgroundColor: 'aliceblue', height: 50, width: 100 }}>
            Align node
          </div>
        </DomAlign>
      </React.Fragment>
    );
  }
}

storiesOf('DomAlign', module)
  .add(
    'API',
    () => (
      <Component
        config={{
          points: ['tl', 'bl'], // bottom-right
          offset: [10, 10],
        }}
      />
    ),
    {
      info: {
        text: `
      This is a dom-align integration component.

      API Reference: https://github.com/yiminghe/dom-align
    `,
        inline: true,
        propTables: [DomAlign],
      },
    },
  )
  .add(
    'Center',
    () => (
      <Component
        config={{
          points: ['bl', 'tc'],
          offset: [5, 0],
        }}
      />
    ),
    {
      info: {
        text: 'TopCenter <~ BottomLeft',
        inline: true,
        propTables: [DomAlign],
      },
    },
  );

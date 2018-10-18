// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
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
    withInfo({
      text: `
      This is a dom-align integration component.

      API Reference: https://github.com/yiminghe/dom-align
    `,
      inline: true,
      propTables: [DomAlign],
    })(() => (
      <Component
        config={{
          points: ['tl', 'bl'], // bottom-right
          offset: [10, 10],
        }}
      />
    )),
  )
  .add(
    'Center',
    withInfo({
      text: 'TopCenter <~ BottomLeft',
      inline: true,
      propTables: [DomAlign],
    })(() => (
      <Component
        config={{
          points: ['bl', 'tc'],
          offset: [5, 0],
        }}
      />
    )),
  );

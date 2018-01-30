// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DomAlign from '.';

class Component extends React.Component<
  {
    config: Object,
  },
  {
    target?: React.ElementRef<any>,
  },
> {
  state = { target: undefined };
  onRef = (target: React.ElementRef<any>) => this.setState({ target });
  render() {
    const { config } = this.props;
    return (
      <React.Fragment>
        <div
          ref={this.onRef}
          style={{ backgroundColor: 'antiquewhite', height: 100, width: 100 }}
        >
          Target node
        </div>

        <DomAlign config={config} target={this.state.target}>
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

// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Dialog from '.';

class StatefulDialog extends React.Component<
  {
    containerTransition?: Object,
  },
  {
    show: boolean,
  },
> {
  state = { show: false };
  onClick = () => this.setState({ show: !this.state.show });
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
        >
          Open dialog
        </span>

        {show && (
          <Dialog
            onOutsideClick={onHide}
            containerTransition={containerTransition}
          >
            <div key="div" style={{ width: 300, backgroundColor: 'aliceblue' }}>
              This is content.
            </div>
          </Dialog>
        )}
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

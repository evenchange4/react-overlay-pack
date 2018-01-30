// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import ClickOutside from '.';

storiesOf('ClickOutside', module).add(
  'API',
  withInfo({
    text: '',
    inline: true,
    propTables: [ClickOutside],
  })(() => (
    <ClickOutside onClick={action('ClickOutside')}>
      <div
        style={{
          backgroundColor: 'antiquewhite',
          height: 100,
          width: 500,
        }}
      >
        {'Click outside.'}
        <br />
        {'(Press [cmd+d] to open action logger.)'}
      </div>
    </ClickOutside>
  )),
);

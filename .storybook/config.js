// @flow
import { configure, setAddon } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';

setAddon(infoAddon);
setDefaults({ inline: true });
withOptions({
  name: 'react-overlay-pack',
  url: 'https://github.com/evenchange4/react-overlay-pack',
  sortStoriesByKind: true,
});

// $FlowFixMe
const context = require.context('../src/', true, /\.example\.js$/);
function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);

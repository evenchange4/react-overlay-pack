import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

/**
 * ref: https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core#configure-jest-to-work-with-webpacks-requirecontext
 */

registerRequireContextHook();

Enzyme.configure({ adapter: new Adapter() });

/**
 * Hint: mock for snapshot
 * ref: https://github.com/storybooks/storybook/issues/1011#issuecomment-322698049
 */
jest.mock('@storybook/addon-info', () => ({
  withInfo: () => storyFn => storyFn,
  setDefaults: () => {},
}));

jest.mock('dom-align', () => () => {});

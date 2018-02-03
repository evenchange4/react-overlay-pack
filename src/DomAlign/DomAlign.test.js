/* global window */
// @flow

import * as React from 'react';
import { mount } from 'enzyme';
import DomAlign from '../DomAlign';

jest.mock('raf-throttle', () => a => {
  const fn = a;
  fn.cancel = () => {};
  return fn;
});

it('should add a "scroll & resize" EventListener of window', () => {
  // ref: https://github.com/airbnb/enzyme/issues/426
  const windowEvents = {};
  (window: any).addEventListener = jest.fn((event, cb) => {
    windowEvents[event] = cb;
  });
  (window: any).removeEventListener = jest.fn();

  // Before mount
  expect(windowEvents).toEqual({});
  mount(
    <DomAlign config={{}} target={{}} resize>
      <div style={{ backgroundColor: 'aliceblue', height: 50, width: 100 }}>
        Align node
      </div>
    </DomAlign>,
  );

  // After mount
  expect(windowEvents).toMatchSnapshot();
});

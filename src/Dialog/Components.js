// @flow
import * as React from 'react';

export const Container = (props: { children?: React.Node }) => (
  <div
    {...props}
    style={{
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      overflow: 'auto',
      pointerEvents: 'none',
    }}
  />
);

export const BackdropContainer = ({
  style,
  ...otherProps
}: {
  style?: Object,
  children?: React.Node,
}) => (
  <div
    {...otherProps}
    style={{
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      overflow: 'auto',
      ...style,
    }}
  />
);

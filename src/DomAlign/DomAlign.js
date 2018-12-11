/* global window */
// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import domAlign from 'dom-align';
import rafThrottle from 'raf-throttle';

export type Props = {
  children: React.Node,
  config: Object, // docs: https://github.com/yiminghe/dom-align#config-object-details
  target: React.ElementRef<*>,
  resize?: boolean,
};

class DomAlign extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    config: PropTypes.shape({
      points: PropTypes.array,
      offset: PropTypes.array,
    }),
    target: PropTypes.object, // eslint-disable-line
    resize: PropTypes.bool,
  };

  static defaultProps = {
    target: undefined,
    resize: false,
  };

  constructor(props: Props) {
    super(props);

    this.source = React.createRef();
    this.align = rafThrottle(() => {
      const { target, config } = this.props;
      const { source } = this;

      if (target && target.current && source && source.current) {
        // Note: Wait for two react instance ready.
        domAlign(source.current, target.current, config);
      }
    });
  }

  componentDidMount() {
    const { resize } = this.props;
    this.align();
    if (resize) {
      window.addEventListener('resize', this.align);
      window.addEventListener('scroll', this.align);
      window.addEventListener('wheel', this.align);
    }
  }

  componentDidUpdate() {
    // TODO: make it async. there is a problem of overlay in dialog case.
    this.timeoutId = setTimeout(() => this.align());
  }

  componentWillUnmount() {
    const { resize } = this.props;
    if (resize) {
      window.removeEventListener('resize', this.align);
      window.removeEventListener('scroll', this.align);
      window.removeEventListener('wheel', this.align);
    }
    if (this.align && this.align.cancel) this.align.cancel();
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  timeoutId: ?TimeoutID;

  source: { current: null | React.ElementRef<any> };

  align: () => void;

  render() {
    const { children } = this.props;
    const { source } = this;

    return React.cloneElement(React.Children.only(children), {
      ref: source,
    });
  }
}

export default DomAlign;

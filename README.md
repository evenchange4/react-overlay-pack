# react-overlay-pack

> Reusable components to build Tooltip, Popover and Dialog.

[![Travis][build-badge]][build]
[![Codecov Status][codecov-badge]][codecov]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads]][npm]

[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devdependency-badge]][devdependency]
[![peerDependency Status][peerdependency-badge]][peerdependency]

[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

## Installation

```sh
$ yarn add react-overlay-pack
```

## Demo

- https://react-overlay-pack.netlify.com/

## Usage

### ClickOutside

```js
import { ClickOutside } from 'react-overlay-pack';

<ClickOutside onClick={e => console.log(e)}>
  <div>content</div>
</ClickOutside>;
```

```js
type Props = {
  children: React.Node,
  onClick: (e: any) => void,
};
```

### DomAlign

```js
import { DomAlign } from 'react-overlay-pack';

<div ref={this.target}>
  Target node
</div>

<DomAlign
  config={{ points: ['bl', 'tc'], offset: [5, 0] }}
  target={this.target}
  resize
>
  <div>
    Align node
  </div>
</DomAlign>
```

```js
type Props = {
  children: React.Element<any>,
  config: Object,
  target: React.ElementRef<any>,
  resize?: boolean,
};
```

- `config`: https://github.com/yiminghe/dom-align#config-object-details

### Overlay

```js
import { Overlay } from 'react-overlay-pack';

<span ref={this.target} onClick={() => this.setState({ show: true })}>
  Target node
</span>;

<Overlay
  show={this.state.show}
  target={this.target}
  onOutsideClick={() => this.setState({ show: false })}
  resize
  alignConfig={{ points: ['tr', 'br'], targetOffset: [0, 8] }}
  transitionConfig={{
    style: { transform: 'translateY(-8px)' }, // From
    animation: { translateY: 0 }, // To
  }}
>
  <div key="div">This is overlay content.</div>
</Overlay>;
```

```js
type Props = {
  show: boolean,
  children: any,
  onOutsideClick?: (e: any) => void,
  target?: React.ElementRef<any>,
  alignConfig: Object,
  transitionConfig?: Object,
  resize?: boolean,
};
```

- `alignConfig`: https://github.com/yiminghe/dom-align#config-object-details
- `transitionConfig`: https://github.com/react-component/tween-one

### Dialog

```js
import { Dialog } from 'react-overlay-pack';

<Dialog
  show={this.state.show}
  onOutsideClick={() => this.setState({ show: false })}
>
  <div key="div">This is content.</div>
</Dialog>;
```

```js
type Props = {
  show: boolean,
  children: React.Node,
  onOutsideClick: Function,
  backdropTransition?: Object,
  containerTransition?: Object,
};
```

- `backdropTransition`: https://github.com/react-component/tween-one
- `containerTransition`: https://github.com/react-component/tween-one

### [Portal](https://github.com/tajo/react-portal)

### [Transition](https://github.com/react-component/tween-one)

## Inspiration

- https://github.com/react-bootstrap/react-overlays

## Development

### Requirements

- node >= 11.0.0
- yarn >= 1.10.1
- react >= 16

```sh
$ yarn install --pure-lockfile
$ yarn start
```

## Test

```sh
$ yarn run format
$ yarn run eslint
$ yarn run flow
$ yarn run test:watch
$ yarn run build
```

---

## CONTRIBUTING

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.
- Pull requests must be accompanied by passing automated tests.

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)

[build-badge]: https://img.shields.io/travis/evenchange4/react-overlay-pack/master.svg?style=flat-square
[build]: https://travis-ci.org/evenchange4/react-overlay-pack
[npm-badge]: https://img.shields.io/npm/v/react-overlay-pack.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-overlay-pack
[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/react-overlay-pack.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/react-overlay-pack?branch=master
[npm-downloads]: https://img.shields.io/npm/dt/react-overlay-pack.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-overlay-pack.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/
[dependency-badge]: https://david-dm.org/evenchange4/react-overlay-pack.svg?style=flat-square
[dependency]: https://david-dm.org/evenchange4/react-overlay-pack
[devdependency-badge]: https://david-dm.org/evenchange4/react-overlay-pack/dev-status.svg?style=flat-square
[devdependency]: https://david-dm.org/evenchange4/react-overlay-pack#info=devDependencies
[peerdependency-badge]: https://david-dm.org/evenchange4/react-overlay-pack/peer-status.svg?style=flat-square
[peerdependency]: https://david-dm.org/evenchange4/react-overlay-pack#info=peerDependencies
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier

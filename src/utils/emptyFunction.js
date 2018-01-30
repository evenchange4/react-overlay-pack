// @flow
function emptyFunction(e?: any): void {
  if (e && e.preventDefault) e.preventDefault();
}

export default emptyFunction;

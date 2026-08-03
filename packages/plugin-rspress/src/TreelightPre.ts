import { type ComponentPropsWithoutRef, createElement } from 'react';

function TreelightPre(props: ComponentPropsWithoutRef<'pre'>) {
  return createElement('pre', props);
}

export { TreelightPre };
export default TreelightPre;

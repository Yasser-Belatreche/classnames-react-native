import { expect } from 'chai';

import { stylesOf } from '../src';

describe('classnames-react-native ', () => {
  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
    },

    input: {
      width: '100%',
      backgroundColor: 'white',
    },

    text: {
      fontSize: 30,
    },

    overlay: {
      position: 'absolute',
    },

    card: {
      height: 100,
      width: 200,
    },
  } as const;

  const st = stylesOf(styles);

  it('given a key of the styles object, should extract the target styles of that key', () => {
    expect(st('container')).to.deep.equal(styles.container);
  });

  it('given Record of key-value pair, should extract the target styles of the keys, only if the value if truthy', () => {
    expect(st({ container: true, input: null, text: 'true' })).to.deep.equal([
      styles.container,
      styles.text,
    ]);
  });

  it('should support mutiple arguments following the same rules', () => {
    expect(
      st({ card: null }, 'container', 'input', { text: true, card: false, overlay: true }),
    ).to.deep.equal([styles.container, styles.input, styles.text, styles.overlay]);
  });
});

const main = require('../js/main');
const Phaser = require('../js/phaser.min.js')

describe('Main', () => {
  beforeEach(() => {
    const createElement = document.createElement.bind(document)
    document.createElement = (tagName) => {
      if(tagName === 'canvas'){
        return {
          getContext: () => ({}),
          measureText: () => ({})
        };
      }
      return createElement(tagName);
    };
  });

  // test('canvas exists', () => {
  //   expect(game).toEqual(new Phaser.Game(960, 600, Phaser.AUTO, 'game'))
  // })
})

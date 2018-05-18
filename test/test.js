import assert from 'assert'
import Playground from '../js/util/playground'

console.log('taee', Playground, assert)

describe('Playground', () => {
  describe('#extractPlayName()', () => {
    it('From https://jsfiddle.net/amitavroy/2p9gsz49/ should return jsfiddle.net', function() {
      assert.equal(Playground.extractPlayname('https://jsfiddle.net/amitavroy/2p9gsz49/'), 'jsfiddle.net');
    });
  });
});
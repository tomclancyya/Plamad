const chai = require('chai');

chai.should();

describe('Add two numbers', () => {
  it('Equals 4', () => {
    const total = 2 + 2;
    total.should.equal(4);
  });
});


//https://jestjs.io/ru/docs/getting-started

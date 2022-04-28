'use strict';

const mock = require('egg-mock');

describe('test/mapperToString.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mapperToString-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mapperToString')
      .expect(200);
  });
});

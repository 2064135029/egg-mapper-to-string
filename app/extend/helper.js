'use strict';

const sqlstring = require('sqlstring');

module.exports = {
  page(params, currentPage, pageSize) {
    if (!Array.isArray(params) && arguments.length > 0) {
      params = Array.from(arguments);
      currentPage = pageSize = undefined;
    }
    const {
      config: {
        mybatis: { defaultPageSize, pageOffset, currentPageName, pageSizeName },
      },
      ctx: {
        request: { body },
        query,
      },
    } = this;
    const _page =
      typeof currentPage === 'undefined'
        ? body[currentPageName] || query[currentPageName] || pageOffset
        : currentPage;
    const _size =
      typeof pageSize === 'undefined'
        ? body[pageSizeName] || query[pageSizeName] || defaultPageSize
        : pageSize;
    const _limit = [ (_page - pageOffset) * _size, parseInt(_size) ];
    if (Array.isArray(params)) {
      return params.concat(_limit).concat(params);
    }
    return _limit;
  },
  sqlstring,
};

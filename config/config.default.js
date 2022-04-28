'use strict';

/**
 * egg-mapperToString default config
 * @member Config#mapperToString
 * @property {String} SOME_KEY - some description
 */
const path = require('path');

module.exports = appInfo => ({
  mybatis: {
    mapperPath: path.join(appInfo.baseDir, 'mapper'),
    defaultPageSize: 10, // 默认分页条数
    pageOffset: 1, // 分页偏移量
    currentPageName: 'currentPage',
    pageSizeName: 'pageSize',
  },
});

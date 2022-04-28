'use strict';

const mybatisMapper = require('mybatis-mapper');
const fs = require('fs');
const path = require('path');
const sqlstring = require('sqlstring');

const MAPPER = Symbol('mybatis#mapper');

module.exports = {
  get mapper() {
    if (!this[MAPPER]) {
      const mappers = [];
      _loadMappers(this.config.mybatis.mapperPath, mappers);
      mybatisMapper.createMapper(mappers);
      this[MAPPER] = (namespace, sqlid, values, params) => {
        const format = { language: 'sql', indent: '  ' };
        return sqlstring.format(
          mybatisMapper.getStatement(namespace, sqlid, params, format),
          values
        );
      };
    }
    return this[MAPPER];
  },
};

function _loadMappers(dir, mappers) {
  if (fs.statSync(dir).isFile()) {
    if (path.extname(dir) == '.xml') {
      mappers.push(dir);
    }
  } else {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        _loadMappers(filePath, mappers);
      } else if (path.extname(filePath) == '.xml') {
        mappers.push(filePath);
      }
    }
  }
}

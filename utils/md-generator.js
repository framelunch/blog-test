/* eslint-disable */
const argv = require('argv');
const format = require('date-fns/format');
const parse = require('date-fns/parse');
const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');
/* eslint-enable */

const baseDir = path.join(process.cwd(), 'md', 'news');

const args = argv
  .option([
    {
      name: 'date',
      short: 'd',
      type: 'string',
      description: 'create date(YYYYMMDD), default=today',
      example: "'--date=20160924'",
    },
  ])
  .run().options;

const date = args.date && args.date.match(/^\d{8}$/) ? parse(args.date) : new Date();
const title = args.title || '';
const template = ((_date, _title) =>
  `
---
title: ${_title}
created_at: ${_date}
tags: []
author: John/Jane Doe
publish: false
---

## ${_title}
`.trimLeft())(format(date, 'YYYY-MM-DD'), title);

const filePath = path.join(baseDir, `${format(date, 'YYYYMMDD')}.md`);

// add directory
fs.mkdirsSync(baseDir);

// check file exists
const existsFile = glob.sync(filePath);
if (existsFile.length > 0) {
  console.error(`Already created...: ${existsFile.join(', ')}`);
} else {
  // write file
  fs.writeFileSync(filePath, template);
  console.log(`created!: ${filePath}`);
}

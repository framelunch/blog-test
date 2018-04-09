const argv = require('argv');
const format = require('date-fns/format');
const parse = require('date-fns/parse');
const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');

const baseDir = path.join(process.cwd(), 'md', 'news');

const args = argv.option([
  {
    name: 'date',
    short: 'd',
    type: 'string',
    description: 'create date(YYYYMMDD), default=today',
    example: "'--date=20160924'"
  }
]).run().options;

const date = args.date && args.date.match(/^\d{8}$/) ? parse(args.date) : new Date();
const title = args.title || '';
const template = ((date, title) => `
---
title: ${title}
created_at: ${date}
tags: []
publish: false
---

## ${title}
`.trimLeft()
)(format(date, 'YYYY-MM-DD'), title);

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

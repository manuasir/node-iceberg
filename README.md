[![Build Status](https://travis-ci.org/manuasir/nodejs-scraper.svg?branch=master)](https://travis-ci.org/manuasir/nodejs-scraperr)
[![Inline docs](http://inch-ci.org/github/manuasir/nodejs-scraper.svg?branch=master)](http://inch-ci.org/github/manuasir/nodejs-scraper)
[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![Coverage Status](https://coveralls.io/repos/github/manuasir/nodejs-scraper/badge.svg?branch=master)](https://coveralls.io/github/manuasir/nodejs-scraper?branch=master)
# scrawler (scraper+crawler)

This package works in two ways:

- Scraper mode:

```c
const Scrawler = require('nodejs-scraper')
const domainsToFilter = ['mediafire','mega','ad.fly']
const configuration = {
	nextIteration: { element: 'a', cssClass: 'blog-pager-older-link' },
	payload: { element: 'a', attrib: 'href', substrings: domainsToFilter }
}
const maxLevelDepth = 10
const crawler = new Scrawler("http://someblog.blogspot.com",configuration)
const results = await crawler.start(maxLevelDepth)
```
or load a predeterminate sheet
```c
const Scrawler = require('nodejs-scraper')
const confs = require('../../lib/util/configurations')

const maxLevelDepth = 10
const crawler = new Scrawler("http://someblog.blogspot.com",configuration)
const results = await crawler.start(maxLevelDepth)
```
- Crawler mode:

```c
const scraper = require('nodejs-scraper')
scraper.start()
```


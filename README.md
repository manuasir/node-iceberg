
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ac81eec87f874af4a205ce76fdab981c)](https://www.codacy.com/app/manuasir/node-iceberg?utm_source=github.com&utm_medium=referral&utm_content=manuasir/node-iceberg&utm_campaign=badger)
[![Build Status](https://travis-ci.org/manuasir/node-iceberg.svg?branch=master)](https://travis-ci.org/manuasir/node-iceberg)
[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![Dependency Status](https://gemnasium.com/badges/github.com/manuasir/node-iceberg.svg)](https://gemnasium.com/github.com/manuasir/node-iceberg)
[![Known Vulnerabilities](https://snyk.io/test/github/manuasir/node-iceberg/badge.svg)](https://snyk.io/test/github/manuasir/node-iceberg)
[![Coverage Status](https://coveralls.io/repos/github/manuasir/node-iceberg/badge.svg?branch=master)](https://coveralls.io/github/manuasir/node-iceberg?branch=master)

## node-iceberg
A lightweight Node.js tree-based scraper/crawler. No more callbacks! Just async/await.

## Installation

Download and install via [npm package manager](https://www.npmjs.com/package/node-iceberg) (stable):

```
npm install node-iceberg --save
```

Or clone fresh code directly from git:

```
git clone https://github.com/manuasir/node-iceberg.git
cd node-iceberg
npm install
```

## Usage

This package allows to get filtered DOM elements from URLs throw custom iterators, and it works mainly in two ways:

- *Scraper mode*:  Get elements with a filter.

```c
// Example: download all links from a Blogspot URL

const Iceberg = require('node-iceberg')
const getThisDomains = ['mediafire','mega','ad.fly']
const conf = {
	// Iterator: Element that gets you to the next URL to process in blogspot
	iteratorElement: { element: 'a', cssClass: 'blog-pager-older-link' },
	// Desired data to get extracted from the DOM. Example: Download links
	selector: { element: 'a', attrib: 'href', values: getThisDomains }
}
// Max Level Depth to explore: max blog pages
const maxLevelDepth = 10
const scraper= new Iceberg("http://someblog.blogspot.com")
const results = await crawler.start(maxLevelDepth,conf)
// or load a filter:
const confs = require('./plugins/configurations')
const conf = confs.services('blogspot')
const maxLevelDepth = 10
const scraper= new Iceberg("http://someblog.blogspot.com")
const results = await crawler.start(maxLevelDepth,conf)
```
Some websites are allowed to paginate directly from the URL using parameters. Ej: http://url?page=1,2,3...
In that case use it like this, passing only the conf and setting max page in that object:

```c
// Example: get insecure cameras: insecam.org
const Iceberg = require('node-iceberg')
const conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 5 }, selector: { element: 'img', attrib: 'src' } }
const scraper = new Iceberg("http://insecam.org")
const results = await scraper.start(conf)
```


- *Crawler mode*:  Explores ALL links from a URL until the depth threshold is reached. Generates a tree from crawled data. Already explored ways are included only once.

```c
const Iceberg = require('node-iceberg')
const confs = require('./plugins/configurations')
const crawler = new Iceberg('http://reddit.com')
const conf = confs.services('crawler')
const maxLevelDepth = 2
crawler.start(maxLevelDepth,conf)
```
## Test
If you downloaded this package from NPM, it's already testes.
Otherwise you can test it like this:


```c
npm test
```
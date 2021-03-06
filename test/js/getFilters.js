/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
/* global describe, it, before, beforeEach */

const assert = require('assert')
const { AdBlockClient } = require('../..')

describe('getFilters', function () {
  before(function () {
    this.adBlockClient = new AdBlockClient()
  })
  beforeEach(function () {
    this.adBlockClient.clear()
  })
  describe('invalid input', function () {
    it('Returns an empty list when no filterType is specified', function () {
      assert.deepStrictEqual(this.adBlockClient.getFilters(), [])
    })
    it('Returns an empty list when an invalid filterType is specified', function () {
      assert.deepStrictEqual(this.adBlockClient.getFilters('fdsafsdfasdfs'), [])
    })
    it('Returns an empty list when an empty string filterType is specified', function () {
      assert.deepStrictEqual(this.adBlockClient.getFilters(''), [])
    })
  })
  describe('returns filters of the correct types', function () {
    it('for basic filters', function () {
      this.adBlockClient.parse('basicfilter')
      const filters = this.adBlockClient.getFilters('filters')
      assert.strictEqual(filters.length, 1)
      assert.strictEqual(filters[0].isDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for cosmetic filters', function () {
      this.adBlockClient.parse('##table[width="80%"]')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      const cosmeticFilters = this.adBlockClient.getFilters('cosmeticFilters')
      assert.strictEqual(cosmeticFilters.length, 1)
      assert.strictEqual(cosmeticFilters[0].isDomainOnlyFilter, false)
      assert.strictEqual(cosmeticFilters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(cosmeticFilters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(cosmeticFilters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for html filters', function () {
      this.adBlockClient.parse('example.org$$script[data-src="banner"]')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      const htmlFilters = this.adBlockClient.getFilters('htmlFilters')
      assert.strictEqual(htmlFilters.length, 1)
      assert.strictEqual(htmlFilters[0].isDomainOnlyFilter, true)
      assert.strictEqual(htmlFilters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(htmlFilters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(htmlFilters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for exception filters', function () {
      this.adBlockClient.parse('@@advice')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      const exceptionFilters = this.adBlockClient.getFilters('exceptionFilters')
      assert.strictEqual(exceptionFilters.length, 1)
      assert.strictEqual(exceptionFilters[0].isDomainOnlyFilter, false)
      assert.strictEqual(exceptionFilters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(exceptionFilters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(exceptionFilters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for noFingerprint', function () {
      this.adBlockClient.parse('adv')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      const noFingerprintFilters = this.adBlockClient.getFilters('noFingerprintFilters')
      assert.strictEqual(noFingerprintFilters.length, 1)
      assert.strictEqual(noFingerprintFilters[0].isDomainOnlyFilter, false)
      assert.strictEqual(noFingerprintFilters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(noFingerprintFilters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(noFingerprintFilters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for noFingerprint domain only', function () {
      this.adBlockClient.parse('adv$domain=brianbondy.com')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      const filters = this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters')
      assert.strictEqual(filters.length, 1)
      assert.strictEqual(filters[0].isDomainOnlyFilter, true)
      assert.strictEqual(filters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for noFingerprint anti-domain only', function () {
      this.adBlockClient.parse('adv$domain=~brianbondy.com')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      const filters = this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters')
      assert.strictEqual(filters.length, 1)
      assert.strictEqual(filters[0].isDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyFilter, true)
      assert.strictEqual(filters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for noFingerprint domain only exception', function () {
      this.adBlockClient.parse('@@adv$domain=brianbondy.com')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      const filters = this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters')
      assert.strictEqual(filters.length, 1)
      assert.strictEqual(filters[0].isDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isDomainOnlyExceptionFilter, true)
      assert.strictEqual(filters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('for noFingerprint anti-domain only exception', function () {
      this.adBlockClient.parse('@@adv$domain=~brianbondy.com')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      const filters = this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters')
      assert.strictEqual(filters.length, 1)
      assert.strictEqual(filters[0].isDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyExceptionFilter, true)
    })
    it('simple host anchored filters', function () {
      this.adBlockClient.parse('||test.com')
      assert.strictEqual(this.adBlockClient.getFilters('filters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
    it('host anchored filters with paths', function () {
      this.adBlockClient.parse('||test.com/test')
      const filters = this.adBlockClient.getFilters('filters')
      assert.strictEqual(filters.length, 1)
      assert.strictEqual(filters[0].isDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyFilter, false)
      assert.strictEqual(filters[0].isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filters[0].isAntiDomainOnlyExceptionFilter, false)
      assert.strictEqual(this.adBlockClient.getFilters('cosmeticFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('htmlFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('exceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintDomainOnlyExceptionFilters').length, 0)
      assert.strictEqual(this.adBlockClient.getFilters('noFingerprintAntiDomainOnlyExceptionFilters').length, 0)
    })
  })
  describe('filter data is returned correctly', function () {
    it('parses filter data', function () {
      this.adBlockClient.parse('basicfilter')
      const filter = this.adBlockClient.getFilters('filters')[0]
      assert.strictEqual(filter.data, 'basicfilter')
      assert.strictEqual(Object.keys(filter).length, 8)
    })
    it('parses domainList domains', function () {
      this.adBlockClient.parse('somefilter$domain=test.com|test.net')
      const filter = this.adBlockClient.getFilters('filters')[0]
      assert.strictEqual(filter.data, 'somefilter')
      assert.deepStrictEqual(filter.domainList, ['test.com', 'test.net'])
      assert.deepStrictEqual(filter.antiDomainList, [])
      assert.strictEqual(Object.keys(filter).length, 8)
      assert.strictEqual(filter.isDomainOnlyFilter, true)
      assert.strictEqual(filter.isAntiDomainOnlyFilter, false)
      assert.strictEqual(filter.isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyExceptionFilter, false)
    })
    it('parses domainList domains for exception rule', function () {
      this.adBlockClient.parse('@@somefilter$domain=test.com|test.net')
      const filter = this.adBlockClient.getFilters('exceptionFilters')[0]
      assert.strictEqual(filter.data, 'somefilter')
      assert.deepStrictEqual(filter.domainList, ['test.com', 'test.net'])
      assert.deepStrictEqual(filter.antiDomainList, [])
      assert.strictEqual(Object.keys(filter).length, 8)
      assert.strictEqual(filter.isDomainOnlyFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyFilter, false)
      assert.strictEqual(filter.isDomainOnlyExceptionFilter, true)
      assert.strictEqual(filter.isAntiDomainOnlyExceptionFilter, false)
    })
    it('parses domainList anti domains', function () {
      this.adBlockClient.parse('somefilter$domain=~test.com|~test.net')
      const filter = this.adBlockClient.getFilters('filters')[0]
      assert.strictEqual(filter.data, 'somefilter')
      assert.deepStrictEqual(filter.domainList, [])
      assert.deepStrictEqual(filter.antiDomainList, ['test.com', 'test.net'])
      assert.strictEqual(Object.keys(filter).length, 8)
      assert.strictEqual(filter.isDomainOnlyFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyFilter, true)
      assert.strictEqual(filter.isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyExceptionFilter, false)
    })
    it('parses domainList exception anti domains', function () {
      this.adBlockClient.parse('@@somefilter$domain=~test.com|~test.net')
      const filter = this.adBlockClient.getFilters('exceptionFilters')[0]
      assert.strictEqual(filter.data, 'somefilter')
      assert.deepStrictEqual(filter.domainList, [])
      assert.deepStrictEqual(filter.antiDomainList, ['test.com', 'test.net'])
      assert.strictEqual(Object.keys(filter).length, 8)
      assert.strictEqual(filter.isDomainOnlyFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyFilter, false)
      assert.strictEqual(filter.isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyExceptionFilter, true)
    })
    it('parses domainList mixed domains', function () {
      this.adBlockClient.parse('somefilter$domain=example.com|~good.example.com')
      const filter = this.adBlockClient.getFilters('filters')[0]
      assert.strictEqual(filter.data, 'somefilter')
      assert.deepStrictEqual(filter.domainList, ['example.com'])
      assert.deepStrictEqual(filter.antiDomainList, ['good.example.com'])
      assert.strictEqual(Object.keys(filter).length, 8)
      assert.strictEqual(filter.isDomainOnlyFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyFilter, false)
      assert.strictEqual(filter.isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyExceptionFilter, false)
    })
    it('parses domainList mixed domains for an exception rule', function () {
      this.adBlockClient.parse('@@somefilter$domain=example.com|~good.example.com')
      const filter = this.adBlockClient.getFilters('exceptionFilters')[0]
      assert.strictEqual(filter.data, 'somefilter')
      assert.deepStrictEqual(filter.domainList, ['example.com'])
      assert.deepStrictEqual(filter.antiDomainList, ['good.example.com'])
      assert.strictEqual(Object.keys(filter).length, 8)
      assert.strictEqual(filter.isDomainOnlyFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyFilter, false)
      assert.strictEqual(filter.isDomainOnlyExceptionFilter, false)
      assert.strictEqual(filter.isAntiDomainOnlyExceptionFilter, false)
    })
  })
})

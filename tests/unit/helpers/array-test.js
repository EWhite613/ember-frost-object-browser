/* jshint expr:true */
import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import {
  array
} from 'ember-frost-object-browser/helpers/array'

describe('ArrayHelper', function () {
  // Replace this with your real tests.
  it('works', function () {
    let result = array(42)
    expect(result).to.be.ok
  })
})

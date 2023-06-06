/*
 * @vinejs/vine
 *
 * (c) VineJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Vine } from '../../src/vine/main.js'

const vine = new Vine()

test.group('Vine Helpers', () => {
  test('check if the value is true', ({ assert }) => {
    assert.isTrue(vine.helpers.isTrue(true))
    assert.isTrue(vine.helpers.isTrue(1))
    assert.isTrue(vine.helpers.isTrue('true'))
    assert.isTrue(vine.helpers.isTrue('1'))
    assert.isTrue(vine.helpers.isTrue('on'))
    assert.isFalse(vine.helpers.isTrue('foo'))
  })

  test('check if the value is false', ({ assert }) => {
    assert.isTrue(vine.helpers.isFalse(false))
    assert.isTrue(vine.helpers.isFalse(0))
    assert.isTrue(vine.helpers.isFalse('false'))
    assert.isTrue(vine.helpers.isFalse('0'))
    assert.isFalse(vine.helpers.isFalse('on'))
    assert.isFalse(vine.helpers.isFalse('true'))
  })

  test('check if the value is string', ({ assert, expectTypeOf }) => {
    assert.isTrue(vine.helpers.isString('hello'))
    assert.isFalse(vine.helpers.isString(true))

    const value: unknown = 'hello'
    if (vine.helpers.isString(value)) {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })

  test('check if the value is object', ({ assert, expectTypeOf }) => {
    assert.isTrue(vine.helpers.isObject({}))
    assert.isFalse(vine.helpers.isObject(null))
    assert.isFalse(vine.helpers.isObject([]))
    assert.isFalse(vine.helpers.isObject('hello'))

    const value: unknown = { foo: 'bar' }
    if (vine.helpers.isObject(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<PropertyKey, unknown>>()
      assert.equal(value.foo, 'bar')
      assert.isUndefined(value.baz)
    }

    if (vine.helpers.isObject<string>(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<PropertyKey, string>>()
    }
  })

  test('check if the value is array', ({ assert, expectTypeOf }) => {
    assert.isTrue(vine.helpers.isArray([]))
    assert.isFalse(vine.helpers.isArray(null))
    assert.isFalse(vine.helpers.isArray({}))
    assert.isFalse(vine.helpers.isArray('hello'))

    const value: unknown = ['hello', 'world']
    if (vine.helpers.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<unknown[]>()
      assert.equal(value[0], 'hello')
      assert.equal(value[1], 'world')
    }

    if (vine.helpers.isArray<string>(value)) {
      expectTypeOf(value).toEqualTypeOf<string[]>()
    }
  })

  test('check if the value is numeric', ({ assert }) => {
    assert.isTrue(vine.helpers.isNumeric('22'))
    assert.isTrue(vine.helpers.isNumeric('22.12'))
    assert.isTrue(vine.helpers.isNumeric('22.00'))
    assert.isFalse(vine.helpers.isNumeric('foo'))
  })

  test('convert value to number', ({ assert }) => {
    assert.equal(vine.helpers.asNumber('22'), 22)
    assert.equal(vine.helpers.asNumber('22.12'), 22.12)
    assert.equal(vine.helpers.asNumber('22.00'), 22)
    assert.isNaN(vine.helpers.asNumber('foo'))
  })

  test('convert value to boolean', ({ assert }) => {
    assert.equal(vine.helpers.asBoolean(true), true)
    assert.equal(vine.helpers.asBoolean(1), true)
    assert.equal(vine.helpers.asBoolean('true'), true)
    assert.equal(vine.helpers.asBoolean('1'), true)
    assert.equal(vine.helpers.asBoolean('on'), true)
    assert.isNull(vine.helpers.asBoolean('foo'))

    assert.equal(vine.helpers.asBoolean(false), false)
    assert.equal(vine.helpers.asBoolean(0), false)
    assert.equal(vine.helpers.asBoolean('false'), false)
    assert.equal(vine.helpers.asBoolean('0'), false)
    assert.isNull(vine.helpers.asBoolean('foo'))
  })
})
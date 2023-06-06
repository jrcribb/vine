/*
 * vinejs
 *
 * (c) VineJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import camelcase from 'camelcase'
import { RefsStore, ArrayNode } from '@vinejs/compiler/types'

import { BaseType } from '../base.js'
import { BRAND, CBRAND, PARSE } from '../../symbols.js'
import type { ParserOptions, SchemaTypes } from '../../types.js'

import {
  compactRule,
  notEmptyRule,
  distinctRule,
  minLengthRule,
  maxLengthRule,
  fixedLengthRule,
} from './rules.js'

/**
 * VineArray represents an array schema type in the validation
 * pipeline
 */
export class VineArray<Schema extends SchemaTypes> extends BaseType<
  Schema[typeof BRAND][],
  Schema[typeof CBRAND][]
> {
  #schema: Schema

  constructor(schema: Schema) {
    super()
    this.#schema = schema
  }

  /**
   * Compiles to array data type
   */
  [PARSE](propertyName: string, refs: RefsStore, options: ParserOptions): ArrayNode {
    return {
      type: 'array',
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelcase(propertyName) : propertyName,
      bail: this.options.bail,
      allowNull: this.options.allowNull,
      isOptional: this.options.isOptional,
      each: this.#schema[PARSE]('*', refs, options),
      parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : undefined,
      validations: this.compileValidations(refs),
    }
  }

  /**
   * Enforce a minimum length on an array field
   */
  minLength(expectedLength: number) {
    return this.use(minLengthRule({ expectedLength }))
  }

  /**
   * Enforce a maximum length on an array field
   */
  maxLength(expectedLength: number) {
    return this.use(maxLengthRule({ expectedLength }))
  }

  /**
   * Enforce a fixed length on an array field
   */
  fixedLength(expectedLength: number) {
    return this.use(fixedLengthRule({ expectedLength }))
  }

  /**
   * Ensure the array is not empty
   */
  notEmpty() {
    return this.use(notEmptyRule())
  }

  /**
   * Ensure array elements are distinct/unique
   */
  distinct(fields?: string | string[]) {
    return this.use(distinctRule({ fields }))
  }

  /**
   * Removes empty strings, null and undefined values from the array
   */
  compact() {
    return this.use(compactRule())
  }
}
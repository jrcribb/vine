/*
 * vinejs
 *
 * (c) VineJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseLiteralType } from '../base/literal.js'
import { IS_OF_TYPE, UNIQUE_NAME } from '../../symbols.js'
import type { AlphaNumericOptions, AlphaOptions, FieldOptions, Validation } from '../../types.js'
import {
  urlRule,
  alphaRule,
  emailRule,
  regexRule,
  mobileRule,
  stringRule,
  hexCodeRule,
  activeUrlRule,
  alphaNumericRule,
} from './rules.js'

/**
 * VineString represents a string value in the validation schema.
 */
export class VineString extends BaseLiteralType<string, string> {
  static rules = {
    url: urlRule,
    email: emailRule,
    alpha: alphaRule,
    regex: regexRule,
    string: stringRule,
    mobile: mobileRule,
    hexCode: hexCodeRule,
    activeUrl: activeUrlRule,
    alphaNumeric: alphaNumericRule,
  };

  /**
   * The property must be implemented for "unionOfTypes"
   */
  [UNIQUE_NAME] = 'vine.string';

  /**
   * Checks if the value is of string type. The method must be
   * implemented for "unionOfTypes"
   */
  [IS_OF_TYPE] = (value: unknown) => {
    return typeof value === 'string'
  }

  constructor(options?: FieldOptions, validations?: Validation<any>[]) {
    super(options, validations || [stringRule()])
  }

  /**
   * Validates the value to be a valid URL
   */
  url(...args: Parameters<typeof urlRule>) {
    return this.use(urlRule(...args))
  }

  /**
   * Validates the value to be an active URL
   */
  activeUrl() {
    return this.use(activeUrlRule())
  }

  /**
   * Validates the value to be a valid email address
   */
  email(...args: Parameters<typeof emailRule>) {
    return this.use(emailRule(...args))
  }

  /**
   * Validates the value to be a valid mobile number
   */
  mobile(...args: Parameters<typeof mobileRule>) {
    return this.use(mobileRule(...args))
  }

  /**
   * Validates the value to be a valid hex color code
   */
  hexCode() {
    return this.use(hexCodeRule())
  }

  /**
   * Validates the value to be an active URL
   */
  regex(expression: RegExp) {
    return this.use(regexRule(expression))
  }

  /**
   * Validates the value to contain only letters
   */
  alpha(options?: AlphaOptions) {
    return this.use(alphaRule(options))
  }

  /**
   * Validates the value to contain only letters and
   * numbers
   */
  alphaNumeric(options?: AlphaNumericOptions) {
    return this.use(alphaNumericRule(options))
  }

  /**
   * Clones the VineString schema type. The applied options
   * and validations are copied to the new instance
   */
  clone(): this {
    return new VineString(this.cloneOptions(), this.cloneValidations()) as this
  }
}

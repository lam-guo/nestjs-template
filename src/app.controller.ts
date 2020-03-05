import { Controller, Get, Post, Body, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
// TODO 只是个例子，可以删掉
/**
 * @typedef Product
 * @property {integer} id
 * @property {string} name.required - Some description for product
 * @property {Array.<Point>} Point
 */

/**
 * @typedef Point
 * @property {integer} x.required
 * @property {integer} y.required - Some description for point - eg: 1234
 * @property {string} color
 * @property {enum} status - Status values that need to be considered for filter - eg: available,pending
 */

/**
 * @typedef Error
 * @property {string} code.required
 */

/**
 * @typedef Response
 * @property {[integer]} code
 */

/**
 * This function comment is parsed by doctrine
 * sdfkjsldfkj
 * @route POST /users
 * @param {Point.model} point.body.required - the new point
 * @group foos - Operations about user
 * @param {string} Authorization.header.required  - Bearer d2f1fcd027f9446998594bb5fa5c43026d0c038bdddcd9e0a4af025096049929
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @param {enum} status.query.required - Status values that need to be considered for filter - eg: availables,pending
 * @operationId retrieveFooInfo
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response.model} 200 - An array of user info
 * @returns {Product.model}  default - Unexpected error
 * @returns {Array.<Point>} Point - Some description for point
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @security JWT
 */

/**
 * This function comment is parsed by doctrine
 * sdfkjsldfkj
 * @route POST /sss
 * @param {Point.model} point.body.required - the new point
 * @group foos - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @param {enum} status.query.required - Status values that need to be considered for filter - eg: available,pending
 * @operationId retrieveFooInfo
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response.model} 200 - An array of user info
 * @returns {Product.model}  default - Unexpected error
 * @returns {Array.<Point>} Point - Some description for point
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @security JWT
 */

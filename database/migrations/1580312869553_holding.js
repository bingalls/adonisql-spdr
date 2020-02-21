'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HoldingSchema extends Schema {
  up () {
    this.create('holdings', (table) => {
      table.increments()
      table.string('ticker', 5).notNullable()
      table.string('name', 52).notNullable()
      table.decimal('weight', 7, 6).notNullable()
      table.string('sector', 22).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('holdings')
  }
}

module.exports = HoldingSchema

'use strict'

const { Command } = require('@adonisjs/ace')
const Database = use('Database')
const Env = use('Env')
const excelFile = Env.get('EXCEL_FILE', 'latest.xls')
const Parsexls = use('./Parsexls.js')

class Insert extends Command {
  static get signature () {
    return 'insert'
  }

  static get description () {
    return 'Inserts todays spdr holdings into database'
  }

  async handle (args, options) {
    this.info(`Inserting ${excelFile} into database`)
    const parser = new Parsexls();
    const time = new Date().toISOString().substr(0,10)
    let idx = 0
    while(++idx < 11) {
      let row = parser.getRow(idx);
      this.info(`Inserting ${row.ticker} ${row.name} ${row.weight} ${row.sector} ${time}`);

      await Database.insert({
        ticker: row.ticker,
        name: row.name,
        weight: row.weight,
        sector: row.sector,
        created_at: time,
        updated_at: time,
      }).into('holdings')
    }
    Database.close()
  }
}

module.exports = Insert

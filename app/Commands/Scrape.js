'use strict'

const Axios = use('axios');
const { Command } = require('@adonisjs/ace')
const Env = use('Env')
const excelFile = Env.get('EXCEL_FILE', 'latest.xls')
const Fs = use('fs')

class Scrape extends Command {
  static get signature () {
    return 'scrape'
  }

  static get description () {
    return 'Scrape todays website & insert into database'
  }

  async handle (args, options) {
    const url = Env.get('EXCEL_URL', 'https://www.ssga.com/us/en/individual/etfs/library-content/products/fund-data/etfs/us/holdings-daily-us-en-spy.xlsx')
    this.info(`Getting ${excelFile} from ${url}`)

    const response = await Axios({
      url: url,
      method: 'GET',
      responseType: 'stream'
    })

    const writer = Fs.createWriteStream(excelFile)
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
}

module.exports = Scrape

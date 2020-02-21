const Env = use('Env')
const excelFile = Env.get('EXCEL_FILE', 'latest.xls')
const Xls = use('xlsx')

class Parsexls {
	constructor() {
		this.workbook = Xls.readFile(excelFile);
		this.sheet_name = this.workbook.SheetNames[0];
		this.worksheet = this.workbook.Sheets[this.sheet_name];
	}

	getCell(addr) {
		const cell = this.worksheet[addr];
		return cell ? cell.v : '0';
	}

	getRow(row) {
		row += 5;
		return {
			name: this.getCell('A' + row),
			ticker: this.getCell('B' + row),
			weight: parseFloat(this.getCell('E' + row)),
			sector: this.getCell('F' + row),
		};
	}
}

module.exports = Parsexls;

// Usage:
// const parser = new Parsexls();
// const row = parser.getRow(0);
// console.log(`${row.name} ${row.ticker} ${row.weight} ${row.sector}`);

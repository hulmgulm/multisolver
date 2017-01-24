/** 
  * @desc AMSCO Code class
  * @author dennistreysa multisolver@dennistreysa.de
  * 
  * Copyright (C) 2015-2017  dennistreysa
  * 
  * This program is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.

  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.

  * You should have received a copy of the GNU General Public License
  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
  */

export class AMSCO {

    public decipher(inputString:string, password:string):string {

		let returnString:string = "";

        // Remove all non-numeric chars and remove non-unique digits
		password = password.replace(/[^0-9]+/g, "").split('')
                    .filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');
		// Remove whitespace
        inputString = inputString.replace(/[\s\n\r]+/ig, "");

		if (password) {
			// Sort password
			let passwordSorted:string = password.split("").sort().join("");

			interface ILookup {
				[identifier: string]: number;
			};

			// Build up original table
			let lookUpOtoS:ILookup = {};	// originalIndex -> sortedIndex
			let org_table:Array<Array<string>> = [];
			let cols:Array<Array<any>> = [];
			for (let col:number = 0; col < password.length; col++) {
				cols.push([]);
				org_table.push([]);
				// Build lookup
				for (let c:number = 0; c < password.length; c++) {
					if (password[col] === passwordSorted[c]) {
						lookUpOtoS[col] = c;
						break;
					}
				}
			}

			let processed_letters:number = 0;
			let two_letters:boolean = true;

			while (processed_letters < inputString.length) {
				for (let col:number = 0; col < password.length; col++) {
					if (processed_letters < inputString.length) {
						if (two_letters && (processed_letters + 1 < inputString.length)) {
							cols[lookUpOtoS[col]].push(2);
							processed_letters += 2;
						} else {
							cols[lookUpOtoS[col]].push(1);
							processed_letters++;
						}
						two_letters = !two_letters;
					} else {
						cols[lookUpOtoS[col]].push(0);
					}
					org_table[col].push("");
				}
			}

			let input_offset = 0;

			for (let c:number = 0; c < password.length; c++) {
				for (let row:number = 0; row < cols[c].length; row++) {
					let len_cell:number = cols[c][row];
					if (len_cell) {
						cols[c][row] = inputString.substring(input_offset, input_offset + len_cell);
						input_offset += len_cell;
					}else {
						cols[c][row] = "";
					}
				}
			}

			for (let col_org:number = 0; col_org < password.length; col_org++) {
				for (let row:number = 0; row < cols[col_org].length; row++) {
					org_table[col_org][row] = cols[lookUpOtoS[col_org]][row];
				}
			}

			// Read string in original order
			for (let row:number = 0; row < cols[0].length; row++) {
				for (let col:number = 0; col < password.length; col++) {
					returnString += org_table[col][row];
				}
			}
		}

		return returnString;
	}
}
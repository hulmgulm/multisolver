/** 
  * @desc ADFVGX Code class
  * @author dennistreysa multisolver@dennistreysa.de
  * 
  * Copyright (C) 2015-2016  dennistreysa
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

interface IIndices {
    [identifier: string] : number;
};

export class ADFVGX {

    private indicesADFVGX:IIndices = {
        "A" : 0,
        "D" : 1,
        "F" : 2,
        "G" : 3,
        "V" : 4,
        "X" : 5
    };

    private indicesADFGX:IIndices = {
        "A" : 0,
        "D" : 1,
        "F" : 2,
        "G" : 3,
        "X" : 4
    };

    public decipherADFVGX(inputString:string, password:string, newMatrix:string = ""):string {

        let returnString:string = "";

        inputString = inputString.toUpperCase().replace(/[^A-Z]+/g, "");
        password = password.toUpperCase().replace(/[^A-Z]+/g, "");
        newMatrix = newMatrix.toUpperCase().replace(/[^A-Z0-9]+/g, "");

        let matrix:string = this.createNewMatrix("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", newMatrix);

        if (password) {
			// Sort password
			let passwordSorted:string = password.split("").sort().join("");

			// Create cols
			let hasBlankChar:boolean[] = [];
			let foundChar:boolean[] = [];
			let cols:Array<Array<string>> = [];
			for (let c:number = 0; c < password.length; c++) {
				cols.push([]);
				hasBlankChar.push(null);
				foundChar.push(null);
			}

			let rows_total:number = Math.ceil(inputString.length / password.length);
			let blankChars:number = password.length - (inputString.length % password.length);

			// Determine if original col had blank char
			for (let c:number = 0; c < passwordSorted.length; c++) {
				let foundOriginalOffset:boolean = false;
				let offset:number = 0;

				while (!foundOriginalOffset) {
					// Get next possible offset
					offset += password.substring(offset).indexOf(passwordSorted[c]);

					if (foundChar[offset] === null || offset === -1) {
						// Original offset was found
						foundChar[offset] = true;
						foundOriginalOffset = true;
					} else {
						offset++;
					}
				}

				if (offset >= (password.length - blankChars)) {
					hasBlankChar[c] = true;
				} else {
					hasBlankChar[c] = false;
				}
			}

			let inputPointer:number = 0;
			for (let col:number = 0; col < password.length; col++) {
				for (let row:number = 0; row < rows_total; row++) {
					if (hasBlankChar[col] && row === (rows_total - 1)) {
						cols[col].push("");
					} else {
						cols[col].push(inputString[inputPointer]);
						inputPointer++;
					}
				}
			}

			let colsOriginal:Array<Array<string>> = [];

			// Unsort
			for (let p:number = 0; p < password.length; p++) {
				// Get original offset
				let offset:number = passwordSorted.indexOf(password[p]);
				colsOriginal.push(cols[offset]);

				passwordSorted = passwordSorted.substr(0, offset) + passwordSorted.substr(offset + 1);
				cols.splice(offset, 1);
			}

			let newString:string = "";

			// Create string from array
			for (let r:number = 0; r < rows_total; r++) {
				for (let c:number = 0; c < colsOriginal.length; c++) {
					newString += colsOriginal[c][r];
				}
			}

			// Decipher
			let pattern = newString.match(/[ADFGVX][ADFGVX]/g);

			if (pattern) {
				for (let p:number = 0; p < pattern.length; p++) {
					let row:number = this.indicesADFVGX[pattern[p][0]];
					var col = this.indicesADFVGX[pattern[p][1]];

					returnString += matrix[6 * row + col];
				}
			}
		}

        return returnString;
    }

	public decipherADFGX(inputString:string, password:string, newMatrix:string = ""):string {

        let returnString:string = "";

        inputString = inputString.toUpperCase().replace(/[^^A-IK-Z]+/g, "");
        password = password.toUpperCase().replace(/[^A-Z]+/g, "");
        newMatrix = newMatrix.toUpperCase().replace(/[^A-IK-Z]+/g, "");

		let matrix:string = this.createNewMatrix("ABCDEFGHIKLMNOPQRSTUVWXYZ", newMatrix);

		if (password) {
			// Sort password
			let passwordSorted:string = password.split("").sort().join("");

			// Create cols
			let hasBlankChar:boolean[] = [];
			let foundChar:boolean[] = [];
			let cols:Array<Array<string>> = [];
			for (let c = 0; c < password.length; c++) {
				cols.push([]);
				hasBlankChar.push(null);
				foundChar.push(null);
			}

			let rows_total:number = Math.ceil(inputString.length / password.length);
			let blankChars:number = password.length - (inputString.length % password.length);

			// Determine if original col had blank char
			for (let c = 0, len = passwordSorted.length; c < len; c++) {
				let foundOriginalOffset:boolean = false;
				let offset:number = 0;

				while (!foundOriginalOffset) {
					// Get next possible offset
					offset += password.substring(offset).indexOf(passwordSorted[c]);

					if (foundChar[offset] === null || offset === -1) {
						// Original offset was found
						foundChar[offset] = true;
						foundOriginalOffset = true;
					} else {
						offset++;
					}
				}

				if (offset >= (password.length - blankChars)) {
					hasBlankChar[c] = true;
				} else {
					hasBlankChar[c] = false;
				}
			}

			let inputPointer:number = 0;
			for (let col:number = 0; col < password.length; col++) {
				for (let row:number = 0; row < rows_total; row++) {
					if (hasBlankChar[col] && row === (rows_total - 1)) {
						cols[col].push("");
					} else {
						cols[col].push(inputString[inputPointer]);
						inputPointer++;
					}
				}
			}

			let colsOriginal:Array<Array<string>> = [];

			// Unsort
			for (let p:number = 0; p < password.length; p++) {
				// Get original offset
				let offset = passwordSorted.indexOf(password[p]);
				colsOriginal.push(cols[offset]);

				passwordSorted = passwordSorted.substr(0, offset) + passwordSorted.substr(offset + 1);
				cols.splice(offset, 1);
			}

			let newString:string = "";

			// Create string from array
			for (let r:number = 0; r < rows_total; r++) {
				for (let c:number = 0, len_c = colsOriginal.length; c < len_c; c++) {
					newString += colsOriginal[c][r];
				}
			}

			// Decipher
			let pattern = newString.match(/[ADFGX][ADFGX]/g);

			if (pattern) {
				for (let p = 0, len = pattern.length; p < len; p++) {
					let row = this.indicesADFGX[pattern[p][0]];
					let col = this.indicesADFGX[pattern[p][1]];

					returnString += matrix[5 * row + col];
				}
			}
		}

		return returnString;
	}

	private createNewMatrix(oldMatrix:string, newMatrix:string):string {
		// Create new matrix
		let insertPosition:number = 0;
		for (let c:number = 0; c < newMatrix.length; c++) {
			let offset:number = oldMatrix.substring(insertPosition).indexOf(newMatrix[c]);
			if (offset !== -1) {
				oldMatrix = oldMatrix.substring(0, insertPosition) + newMatrix[c]
                            + oldMatrix.substring(insertPosition, offset + insertPosition)
                            + oldMatrix.substring(offset + insertPosition + 1);
				insertPosition++;
				if ( insertPosition === newMatrix.length ) {
					break;
				}
			}
		}

		return oldMatrix;
	}
}
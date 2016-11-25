/** 
  * @desc Bifid Code class
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

export class Bifid {

    public decipher(inputString:string, password:string = ""):string {

		inputString = inputString.toUpperCase().replace( /[^A-IK-Z]+/g, "");
        password = password.toUpperCase().replace( /[^A-IK-Z]+/g, "");

		let returnString:string = "";
        let matrix:string = this.createNewMatrix( "ABCDEFGHIKLMNOPQRSTUVWXYZ", password);

        let digits:number[] = [];

        inputString.split("").map(function(c:string):number {
            let offset:number = matrix.indexOf(c);
            let row:number = Math.floor(offset / 5);
			let col:number = offset % 5;

            digits.push(row);
            digits.push(col);

            return 0;
        });

        for (let r:number = 0; r < Math.floor(digits.length / 2); r++) {
            returnString += matrix[ 5 * digits[r] + digits[r + Math.floor(digits.length / 2)] ];
        }

		return returnString;
	}

    private createNewMatrix(oldMatrix:string, newMatrix:string):string {
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
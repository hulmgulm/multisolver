/** 
  * @desc Polybios Code class
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

export class Polybios {

    public decipher(inputString:string, password:string = "", sixBySix:boolean = false):string {

		password = password.toUpperCase().replace( (sixBySix ? /[^A-Z0-9]+/g : /[^A-IK-Z]+/g), "");

		let returnString:string = "";
		let matrix:string = this.createNewMatrix( (sixBySix ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" : "ABCDEFGHIKLMNOPQRSTUVWXYZ"), password);

		var matches = inputString.replace(/\D+/g, "").match( (sixBySix ? /[1-6][1-6]/g : /[1-5][1-5]/g) );

		if ( matches ) {

            returnString = matches.map(function(m:string):string {
                let row:number = parseInt(m[0], 10);
				let col:number = parseInt(m[1], 10);

				return matrix[ (sixBySix ? 6 : 5) * ( row - 1 ) + ( col - 1 ) ];
            }).join("");

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
/** 
  * @desc Tap Code class
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

export class Tap {

    private readonly originalMatrix = "ABCDEFGHIJLMNOPQRSTUVWXYZ";

    private guessCombinations:string[] = [
        ". ",
        " ."
    ];

    public decodeNumeric(inputString:string, newMatrix:string):string {
        inputString = inputString.replace(/[^1-5]+/, "");

        let returnString:string = "";
        let matrix:string = this.createNewMatrix(this.originalMatrix, newMatrix);

        let offsets = inputString.match(/.{2,2}/g);
        if (offsets) {
            returnString = offsets.map(function (combination:string) {
                let row:number = combination.charCodeAt(0) - 0x30 - 1;
                let col:number = combination.charCodeAt(1) - 0x30 - 1;
                return matrix[5 * row + col];
            }, this).join("");
        }

        return returnString;
    }

    public guess(inputString:string, newMatrix:string):Array<string> {
        let differentChars:string[] = [];
        let returnArray:string[] = [];

        for (let c of inputString) {
            if (differentChars.indexOf(c) < 0) {
                differentChars.push(c);
                if (differentChars.length > 2) {
                    break;
                }
            }
        }

        if (2 === differentChars.length) {
            returnArray = this.guessCombinations.map(function(combination:string):string {
                return this.decodeNumeric(inputString.split("").map(function(c:string):string {
                    return combination[differentChars.indexOf(c)];
                }).join("").split(/[\s]+/g).map(function (pattern:string) {
                    return pattern.length.toString();
                }).join(""), newMatrix);
            }, this);
        }

        return returnArray;
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
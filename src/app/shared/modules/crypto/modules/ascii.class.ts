/** 
  * @desc ASCII Code class
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

interface PatternDict {
    [identifier:string] : string;
};

export class ASCII {

    private guessCombinations:string[] = [
        "01",
        "10"
    ];

    public decodeBinary(inputString:string, inversed:boolean = false, sevenBits:boolean = false):string {

        inputString = inputString.replace(/[^01]/g, "");

        if (inversed) {
            inputString = inputString.split("").map(function(c:string):string {
                return c === "0" ? "1" : "0";
            }).join("");
        }

        let bytes:RegExpMatchArray = sevenBits ? inputString.match(/.{7,7}/g) : inputString.match(/.{8,8}/g);

        if (bytes) {
            return bytes.map(function(b:string):string {
                let value:number = parseInt(b, 2);
                return (value >= 32) ? String.fromCharCode(value) : "";
            }).join("");
        }

        return "";
    }

    public guess(inputString:string, sevenBits:boolean = false):string[] {

        inputString = inputString.replace(/[\s\r\n]+/g, "");

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
                return this.decodeBinary(inputString.split("").map(function(c:string):string {
                    return combination[differentChars.indexOf(c)];
                }).join(""), false, sevenBits);
            }, this);
        }

        return returnArray;
    }
}
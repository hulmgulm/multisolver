/** 
  * @desc Kennycode Code class
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


export class Kennycode {

    readonly ValueLookup:Array<string> = ["M", "P", "F"];

    private readonly guessCombinations:string[] = [
        "MPF",
        "MFP",
        "FMP",
        "FPM",
        "PMF",
        "PFM"
    ];

    public decode(inputString:string):string {

        let returnString:string = "";

        inputString = inputString.trim();

        if (inputString) {
            returnString = inputString.replace(/[MPF]{3,3}/ig, function (match:string):string {
                let tmpMatch:string = match.toUpperCase();
                let c0 = match.charCodeAt(0);
                let base:number = (c0 >= 65 && c0 <= 90) ? 65 : 97;
                let value:number = base + this.ValueLookup.indexOf(tmpMatch[0]) * 9
                + this.ValueLookup.indexOf(tmpMatch[1]) * 3
                + this.ValueLookup.indexOf(tmpMatch[2]);
                return String.fromCharCode(value);
            }.bind(this));
        }

        return returnString;
    }

    public guess(inputString:string):Array<string> {

        inputString = inputString.replace(/[\s\r\n]+/g, "");

        let differentChars:Array<string> = [];
        let returnArray:Array<string> = [];

        for (let c of inputString) {
            if (differentChars.indexOf(c) < 0) {
                differentChars.push(c);
                if (differentChars.length > 3) {
                    break;
                }
            }
        }

        if (3 === differentChars.length) {
            returnArray = this.guessCombinations.map(function(combination:string):string {
                return this.decode(inputString.split("").map(function(c:string):string {
                    return combination[differentChars.indexOf(c)];
                }).join(""));
            }, this);
        }

        return returnArray;
    }
}
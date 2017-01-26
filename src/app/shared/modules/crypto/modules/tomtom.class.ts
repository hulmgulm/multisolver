/** 
  * @desc TomTom Code class
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


export class TomTom {

    readonly PatternLookUp = {
        "/" : "A",
        "//" : "B",
        "///" : "C",
        "////" : "D",
        "/\\" : "E",
        "//\\" : "F",
        "///\\" : "G",
        "/\\\\" : "H",
        "/\\\\\\" : "I",
        "\\/" : "J",
        "\\\\/" : "K",
        "\\\\\\/" : "L",
        "\\//" : "M",
        "\\///" : "N",
        "/\\/" : "O",
        "//\\/" : "P",
        "/\\\\/" : "Q",
        "/\\//" : "R",
        "\\/\\" : "S",
        "\\\\/\\" : "T",
        "\\//\\" : "U",
        "\\/\\\\" : "V",
        "//\\\\" : "W",
        "\\\\//" : "X",
        "\\/\\/" : "Y",
        "/\\/\\" : "Z"
    };

    private readonly guessCombinations:string[] = [
        "/\\ ",
        "\\/ ",
        "/ \\",
        "\\ /",
        " /\\",
        " \\/",
    ];

    public decode(inputString:string):string {

        let returnString:string = "";
        inputString = inputString.trim();

        if (inputString.match(/[\\\\/]/)) {
            returnString = inputString.replace(/[/\\\\]+/g, function (pattern:string) {

                if (this.PatternLookUp.hasOwnProperty(pattern)) {
                    return this.PatternLookUp[pattern];
                }

                return pattern;
            }.bind(this));
        }

        return returnString;
    }

    public guess(inputString:string):Array<string> {

        let differentChars:Array<string> = [];
        let returnArray:Array<string> = [];
        let DIFFERENT_CHARS:number = 3;

        for (let c of inputString) {
            if (differentChars.indexOf(c) < 0) {
                differentChars.push(c);
                if (differentChars.length > DIFFERENT_CHARS) {
                    break;
                }
            }
        }

        if (DIFFERENT_CHARS === differentChars.length) {
            returnArray = this.guessCombinations.map(function(combination:string):string {
                return this.decode(inputString.split("").map(function(c:string):string {
                    return combination[differentChars.indexOf(c)];
                }).join(""));
            }, this);
        }

        return returnArray;
    }
}
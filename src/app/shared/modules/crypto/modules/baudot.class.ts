/** 
  * @desc Baudot (CCITT-1) Code class
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

export class Baudot {

	private patternLetters:PatternDict;
	private patternDigits:PatternDict;

	private guessCombinations:string[] = [
        "01",
        "10"
    ];

	public constructor() {
		    this.patternLetters = {
							"00100" : "A",
							"00110" : "É",
							"00010" : "E",
							"00011" : "I",
							"00111" : "O",
							"00101" : "U",
							"00001" : "Y",
							"01001" : "B",
							"01101" : "C",
							"01111" : "D",
							"01011" : "F",
							"01010" : "G",
							"01110" : "H",
							"01100" : "J",
							"11100" : "K",
							"11110" : "L",
							"11010" : "M",
							"11011" : "N",
							"11111" : "P",
							"11101" : "Q",
							"11001" : "R",
							"10001" : "S",
							"10101" : "T",
							"10111" : "V",
							"10011" : "W",
							"10010" : "X",
							"10110" : "Z",
							"10100" : "-"
						};

		this.patternDigits = {
							"00100" : "1",
							"00010" : "2",
							"00001" : "3",
							"00101" : "4",
							"00111" : "5",
							"01100" : "6",
							"01010" : "7",
							"01001" : "8",
							"01101" : "9",
							"01111" : "0",
							"00110" : "1/",
							"10101" : "2/",
							"00011" : "3/",
							"01110" : "4/",
							"01011" : "5/",
							"10001" : "7/",
							"10010" : "9/",
							"10100" : ".",
							"10111" : "'",
							"10110" : ":",
							"10011" : "?",
							"11100" : "(",
							"11010" : ")",
							"11001" : "-",
							"11101" : "/",
							"11111" : "+",
							"11110" : "=",
							"11011" : "£"
						};
	}

    public decode(inputString:string, inversed:boolean = false):string {

        inputString = inputString.replace(/[^01]/g, "");

        if (inversed) {
            inputString = inputString.split("").map(function(c:string):string {
                return c === "0" ? "1" : "0";
            }).join("");
        }

        let pattern:RegExpMatchArray = inputString.match(/.{5,5}/g);

        let lookUpDict:PatternDict = this.patternLetters;

        if (pattern) {
            return pattern.map(function(p:string):string {
                switch (p) {
					case "10000": {
						lookUpDict = this.patternLetters;
                        return " ";
                    }
					case "01000": {
						lookUpDict = this.patternDigits;
						return " ";
                    }
					default: {
                        return lookUpDict.hasOwnProperty(p) ? lookUpDict[p] : "";
                    }
				}
            }, this).join("");
        }

        return "";
    }

	public guess(inputString:string):string[] {

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
                return this.decode(inputString.split("").map(function(c:string):string {
                    return combination[differentChars.indexOf(c)];
                }).join(""));
            }, this);
        }

        return returnArray;
    }
}
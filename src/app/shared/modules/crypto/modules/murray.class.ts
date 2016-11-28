/** 
  * @desc Murray (CCITT-2) Code class
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

export class Murray {

	private patternLetters:PatternDict;
	private patternDigits:PatternDict;

	private guessCombinations:string[] = [
        "01",
        "10"
    ];

	public constructor() {
		    this.patternLetters = {
							"00011" : "A",
							"11001" : "B",
							"01110" : "C",
							"01001" : "D",
							"00001" : "E",
							"01101" : "F",
							"11010" : "G",
							"10100" : "H",
							"00110" : "I",
							"01011" : "J",
							"01111" : "K",
							"10010" : "L",
							"11100" : "M",
							"01100" : "N",
							"11000" : "O",
							"10110" : "P",
							"10111" : "Q",
							"01010" : "R",
							"00101" : "S",
							"10000" : "T",
							"00111" : "U",
							"11110" : "V",
							"10011" : "W",
							"11101" : "X",
							"10101" : "Y",
							"10001" : "Z",
							"01000" : "\n",
							"00010" : "\n",
							"00100" : " "
						};

		this.patternDigits = {
							"00011" : "-",
							"11001" : "?",
							"01110" : ":",
							"01001" : "Who's there?",
							"00001" : "3",
							"00110" : "8",
							"01011" : "Bell",
							"01111" : "(",
							"10010" : ")",
							"11100" : ".",
							"01100" : ",",
							"11000" : "9",
							"10110" : "0",
							"10111" : "1",
							"01010" : "4",
							"00101" : "'",
							"10000" : "5",
							"00111" : "7",
							"11110" : "=",
							"10011" : "2",
							"11101" : "/",
							"10101" : "6",
							"10001" : "+",
							"01000" : "\n",
							"00010" : "\n",
							"00100" : " "
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
					case "11111": {
						lookUpDict = this.patternLetters;
                        return " ";
                    }
					case "11011": {
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
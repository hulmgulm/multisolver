/** 
  * @desc Braille Code class
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

interface PatternDict {
    [identifier:string] : string;
};

export class Braille {

    private patternLetters:PatternDict;
    private patternsDigits:PatternDict;

	public constructor() {

		this.patternLetters = {
			"1" : "A",
			"12" : "B",
			"14" : "C",
			"145" : "D",
			"15" : "E",
			"124" : "F",
			"1245" : "G",
			"125" : "H",
			"24" : "I",
			"245" : "J",
			"13" : "K",
			"123" : "L",
			"134" : "M",
			"1345" : "N",
			"135" : "O",
			"1234" : "P",
			"12345" : "Q",
			"1235" : "R",
			"234" : "S",
			"2345" : "T",
			"136" : "U",
			"1236" : "V",
			"2456" : "W",
			"1346" : "X",
			"13456" : "Y",
			"1356" : "Z",
			"345" : "Ä",
			"246" : "Ö",
			"1256" : "Ü",
			"2346" : "ß",
			"23456" : "ST",
			"16" : "AU",
			"126" : "EU",
			"146" : "EI",
			"34" : "(ÄU|;)",
			"346" : "(IE|§)",
			"1456" : "CH",
			"156" : "SCH",
			"2" : ",",
			"25" : ":",
			"3" : ".",
			"26" : "?",
			"235" : "!",
			"236" : "\"",
			"356" : "\"",
			"2356" : "()",
			"36" : "-",
			"6" : "'",
			"12456" : "^",
			"5" : "~",
			"4" : "\"",
			"45" : ">",
			"35" : "*",
			"46" : "$",
			"456" : "_"
		};

		this.patternsDigits = {
			"1" : "1",
			"12" : "2",
			"14" : "3",
			"145" : "4",
			"15" : "5",
			"124" : "6",
			"1245" : "7",
			"125" : "8",
			"24" : "9",
			"245" : "0"
		};
	}

    public decode(inputString:string):string {
        inputString = inputString.replace(/[^1-6\s\r\n]/g, "").trim();

        let currentPattern:PatternDict = this.patternLetters;
        let pattern:RegExpMatchArray = inputString.split(/[\s\r\n]+/);

        if (pattern) {
            return pattern.map(function(p:string):string {
                p = p.split("").sort().join("");
                if (currentPattern.hasOwnProperty(p)) {
					return currentPattern[p];
                } else if ("3456" === p) {
					currentPattern = this.patternsDigits;
                } else {
					currentPattern = this.patternLetters;
					if (currentPattern.hasOwnProperty(p)) {
						return currentPattern[p];
					}
				}
                return "";
            }, this).join("");
        }

        return "";
    }

}
/** 
  * @desc Bacon Code class
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

export class Bacon {

    private pattern:string[];

    private guessCombinations:string[] = [
        "ab",
        "ba"
    ];

    constructor() {
        this.pattern = [
                            "A", "B", "C", "D", "E", "F", "G", "H", "(I|J)", "K", "L", "M",
                            "N", "O", "P", "Q", "R", "S", "T", "(U|V)", "W", "X", "Y", "Z"
                        ];
    }

    public decode(inputString:string, inversed:boolean = false):string {

        inputString = inputString.toUpperCase().replace(/[^AB]/g, "");

        if (inversed) {
            inputString = inputString.replace(/A/g, "1").replace(/B/g, "0");
        } else {
            inputString = inputString.replace(/A/g, "0").replace(/B/g, "1");
        }

        let parts:RegExpMatchArray = inputString.match(/.{5,5}/g);

        if (parts) {
            return parts.map(function(p:string):string {
                let value:number = parseInt(p, 2);
                return (value < this.pattern.length) ? this.pattern[value] : "";
            }, this).join("");
        }

        return "";
	}

    public firstCharUpperLower(inputString:string, inversed:boolean = false):string {

        // Sort out all non-letter chars
        inputString = inputString.split("").map(function(c:string):string {
            if ( c.match(/[\s\r\n]/) ) {
                return c;
            }
            if ( c.toUpperCase() === c.toLowerCase() ) {
                return "";
            }
            return c;
        }).join("").trim();

        return this.decode(inputString.split(/[\s\r\n]/g).map(function(w:string):string {
            if (w) {
                return (w[0] === w[0].toUpperCase()) ? "b" : "a";
            }
            return "";
        }, this).join(""), inversed);
    }

    public firstCharAZ(inputString:string, inversed:boolean = false):string {

        inputString = inputString.toUpperCase().replace(/[^A-Z\s\r\n]/g, "");

        return this.decode(inputString.split(/[\s\r\n]/g).map(function(w:string):string {
            if (w) {
                return (w.charCodeAt(0) <= 77) ? "a" : "b";
            }
            return "";
        }, this).join(""), inversed);
    }

    public allCharsUpperLower(inputString:string, inversed:boolean = false):string {

        // Sort out all non-letter chars
        inputString = inputString.split("").map(function(c:string):string {
            if ( c.toUpperCase() === c.toLowerCase() ) {
                return "";
            }
            return c;
        }).join("").trim();

        return this.decode(inputString.split("").map(function(w:string):string {
            return (w[0] === w[0].toUpperCase()) ? "b" : "a";
        }, this).join(""), inversed);
    }

    public allCharsAZ(inputString:string, inversed:boolean = false):string {

        // Sort out all non-letter chars
        inputString = inputString.split("").map(function(c:string):string {
            if ( c.toUpperCase() === c.toLowerCase() ) {
                return "";
            }
            return c;
        }).join("").trim();

        return this.decode(inputString.split("").map(function(w:string):string {
            return (w.charCodeAt(0) <= 77) ? "a" : "b";
        }, this).join(""), inversed);
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
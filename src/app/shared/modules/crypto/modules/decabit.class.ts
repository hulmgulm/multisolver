/** 
  * @desc Decabit Code class
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

interface IPattern {
    [identifier: string] : number;
};

export class Decabit {

    private DecabitPattern:IPattern;

    private guessCombinations:string[] = [
        "+-",
        "-+"
    ];

    constructor() {
        this.DecabitPattern = {
            "--+-+++-+-" : 0,
            "+--+++--+-" : 1,
            "+--++-+-+-" : 2,
            "+--+-++-+-" : 3,
            "----+++-++" : 4,
            "++--+++---" : 5,
            "++--++--+-" : 6,
            "++--+-+-+-" : 7,
            "++---++-+-" : 8,
            "---++++-+-" : 9,
            "+-+-+++---" : 10,
            "+-+-+-+-+-" : 11,
            "+-+--++-+-" : 12,
            "+---++-++-" : 13,
            "+---++--++" : 14,
            "--+++-++--" : 15,
            "---++-+++-" : 16,
            "+---+-++-+" : 17,
            "+--++--+-+" : 18,
            "+--++-+--+" : 19,
            "+-+++--+--" : 20,
            "+--+++-+--" : 21,
            "++--+-++--" : 22,
            "-+-++-++--" : 23,
            "+--++--++-" : 24,
            "+-+++-+---" : 25,
            "++-+--++--" : 26,
            "+-+-+-++--" : 27,
            "+--+-+++--" : 28,
            "+--+--++-+" : 29,
            "+-++-++---" : 30,
            "+-++-+-+--" : 31,
            "+-+-++-+--" : 32,
            "+---++++--" : 33,
            "+-+--+-++-" : 34,
            "+++--++---" : 35,
            "+++--+-+--" : 36,
            "+++---++--" : 37,
            "++---+++--" : 38,
            "--+-++++--" : 39,
            "++--++-+--" : 40,
            "-+-+-+-++-" : 41,
            "++----+++-" : 42,
            "+----+-+++" : 43,
            "++---+-+-+" : 44,
            "++-+-+-+--" : 45,
            "++-+-+--+-" : 46,
            "+++----++-" : 47,
            "++--+--++-" : 48,
            "+--+-+-++-" : 49,
            "++++----+-" : 50,
            "++-++---+-" : 51,
            "+-+++---+-" : 52,
            "-++++---+-" : 53,
            "+-+-+---++" : 54,
            "+++-++----" : 55,
            "+++-+-+---" : 56,
            "+-+-+--++-" : 57,
            "-++-+--++-" : 58,
            "+++-+----+" : 59,
            "++++-+----" : 60,
            "-+++-++---" : 61,
            "-+-+-++-+-" : 62,
            "++---++--+" : 63,
            "++-+--+--+" : 64,
            "++-+++----" : 65,
            "++++--+---" : 66,
            "+--++++---" : 67,
            "-+-++++---" : 68,
            "++-+--+-+-" : 69,
            "-++---+++-" : 70,
            "+---+-+++-" : 71,
            "--+-+-+++-" : 72,
            "+----++++-" : 73,
            "--+--++++-" : 74,
            "+++---+-+-" : 75,
            "+-++---++-" : 76,
            "+--+--+++-" : 77,
            "--++--+++-" : 78,
            "+-+---+-++" : 79,
            "-+++--+-+-" : 80,
            "-+-++-+-+-" : 81,
            "-+++---++-" : 82,
            "-+-++--++-" : 83,
            "-+---++++-" : 84,
            "-++++--+--" : 85,
            "-++-++-+--" : 86,
            "--++++-+--" : 87,
            "--++-+++--" : 88,
            "--++-+-++-" : 89,
            "+-++++----" : 90,
            "--++++--+-" : 91,
            "--++-++-+-" : 92,
            "+--+-+--++" : 93,
            "+-++----++" : 94,
            "-+-+++--+-" : 95,
            "-++-+-+-+-" : 96,
            "-+--++-++-" : 97,
            "---+++-++-" : 98,
            "-+--+-+++-" : 99,
            "+---+++-+-" : 100,
            "-+--+++-+-" : 101,
            "+-+-++--+-" : 102,
            "+--++-++--" : 103,
            "++-++--+--" : 104,
            "+-++--++--" : 105,
            "+-+--+++--" : 106,
            "-++--+++--" : 107,
            "++---+-++-" : 108,
            "++-+---++-" : 109,
            "+++-+---+-" : 110,
            "+++-+--+--" : 111,
            "++-+-++---" : 112,
            "++-++-+---" : 113,
            "+-+---+++-" : 114,
            "+-++--+-+-" : 115,
            "-+-+--+++-" : 116,
            "-+++-+-+--" : 117,
            "+-++-+--+-" : 118,
            "-++-+++---" : 119,
            "+++--+--+-" : 120,
            "+++++-----" : 121,
            "-+++++----" : 122,
            "--+++++---" : 123,
            "---+++++--" : 124,
            "----+++++-" : 125,
            "++++++++++" : 126
        };
    }

    public decode(inputString:string, numeric:boolean = false):string {

        let returnString:string = "";

        inputString = inputString.replace(/[^+\-]+/g, "");

        if (inputString.length >= 10) {
            returnString = inputString.match(/.{10,10}/g).map(function(pattern:string){
                return this.DecabitPattern.hasOwnProperty(pattern) ? (
                    numeric ? this.DecabitPattern[pattern]
                            : String.fromCharCode(this.DecabitPattern[pattern])
                 ) : "";
            }, this).join(numeric ? " " : "");
        }

        return returnString;
    }

    public guess(inputString:string, numeric:boolean = false):string[] {

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
                }).join(""), numeric);
            }, this);
        }

        return returnArray;
    }

}
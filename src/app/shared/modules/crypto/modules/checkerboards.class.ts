/** 
  * @desc Checkerboards Code class
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

interface ICheckerBoard {
    cols: Array<string>;
    rows: Array<string>;
    chars: Array<Array<string>>;
}

interface ICheckerBoardsLookUp {
    [identifier: string]: ICheckerBoard ;
}

export class Checkerboards {

    private readonly LookUpDict:ICheckerBoardsLookUp = {
        "DEIN_STAR" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["4", "5"],
            chars : [
                        ["D", "E", "I", "N", "", "", "S", "T", "A", "R"],
                        ["B", "C", "F", "G", "H", "J", "K", "L", "M", "O"],
                        ["P", "Q", "U", "V", "W", "X", "Y", "Z", ".", ","]
                    ]
        },

        "EI_STRAND" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["2", "3"],
            chars : [
                        ["E", "I", "", "", "S", "T", "R", "A", "N", "D"],
                        ["B", "C", "F", "G", "H", "J", "K", "L", "M", "O"],
                        ["P", "Q", "U", "V", "W", "X", "Y", "Z", "", ""]
                    ]
        },

        "STEIN_RAD" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["5", "6"],
            chars : [
                        ["S", "T", "E", "I", "N", "", "", "R", "A", "D"],
                        ["B", "C", "F", "G", "H", "J", "K", "L", "M", "O"],
                        ["P", "Q", "U", "V", "W", "X", "Y", "Z", "", ""]
                    ]
        },

        "STRADDING_STANDARD" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["1", "2"],
            chars : [
                        ["D", "", "", "E", "I", "N", "S", "T", "A", "R"],
                        ["B", "C", "F", "G", "H", "J", "K", "L", "M", "O"],
                        ["P", "Q", "U", "V", "W", "X", "Y", "Z", ".", "/"]
                    ]
        },

        "STRADDING_COMPLEX" : {
            cols : ["8", "5", "2", "9", "4", "0", "6", "1", "3", "7"],
            rows : ["9", "6"],
            chars : [
                        ["D", "E", "I", "", "N", "S", "", "T", "A", "R"],
                        ["B", "C", "F", "G", "H", "J", "K", "L", "M", "O"],
                        ["P", "Q", "U", "V", "W", "X", "Y", "Z", ".", "/"]
                    ]
        },

        "STRADDING_DIGITS" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["1", "2", "3"],
            chars : [
                        ["D", "", "", "", "E", "I", "N", "S", "T", "A"],
                        ["R", "B", "C", "F", "G", "H", "J", "K", "L", "M"],
                        ["O", "P", "Q", "U", "V", "W", "X", "Y", "Z", "0"],
                        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
                    ]
        },

        "KARTEN_KOSAK" : {
            cols : ["1", "4", "8", "9", "3", "0", "2", "5", "6", "7"],
            rows : ["7", "6", "5", "2"],
            chars : [
                        ["K", "A", "R", "T", "E", "N", "", "", "", ""],
                        ["O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"],
                        ["A", "T", "U", "V", "W", "X", "Y", "Z", "A", "B"],
                        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                        ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"]
                    ]
        },

        "CODE_535" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["6", "7", "8"],
            chars : [
                        ["A", "E", "I", "N", "R", "S", "", "", "", "'Code'"],
                        ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M"],
                        ["O", "P", "Q", "T", "U", "V", "W", "X", "Y", "Z"],
                        ["Ä", "Ö", "Ü", "ß", "0", ":", "/", ".", ",", "-"]
                    ]
        },

        "JUNO" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["7", "8", "9"],
            chars : [
                        ["A", "E", "I", "N", "R", "S", "'Code'", "", "", ""],
                        ["Ä", "B", "C", "D", "F", "G", "H", "J", "K", "L"],
                        ["M", "O", "Ö", "P", "Q", "ß", "T", "U", "Ü", "'Ziffer'"],
                        [".", ",", "-", ":", "/", "V", "W", "X", "Y", "Z"]
                    ]
        },

        "JUPITER" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["7", "8", "9"],
            chars : [
                        ["A", "E", "I", "N", "R", "S", "'Code'", "", "", ""],
                        ["Ä", "B", "C", "D", "F", "G", "H", "J", "K", "L"],
                        ["M", "O", "Ö", "P", "Q", "ß", "T", "U", "Ü", "'Ziffer'"],
                        [".", "≠", "-", ":", "()", "V", "W", "X", "Y", "Z"]
                    ]
        },

        "CHE_GUEVARA" : {
            cols : ["8", "2", "0", "6", "4", "9", "1", "3", "7", "5"],
            rows : ["3", "7", "5"],
            chars : [
                        ["E", "S", "T", "A", "D", "O", "Y", "", "", ""],
                        ["B", "C", "F", "G", "H", "I", "J", ".", ";", ","],
                        ["K", "L", "M", "N", "Ñ", "P", "Q", "'Number'", "'Letter'", ""],
                        ["R", "U", "V", "W", "X", "Z", "", "", "", ""]
                    ]
        },

        "KORALLE" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["1", "4", "6", "7", "9"],
            chars : [
                        ["I", "", "N", "S", "", "E", "", "", "R", ""],
                        ["B", "V", "posten", "P", "qu", "\"", "A", "Ö", "gegen", ","],
                        ["un", "H", "Z", "kontroll", "Ü", "-", "de", "J", "am", "G"],
                        ["M", "st", "Ä", "wohnhaft", "Y", "te", "D", "O", "Uhr", ":"],
                        ["ß", "U", "X", "T", "L", "geb. am", "ch", "W", " ", "/"],
                        ["F", ".", "K", "C", "seit", "Betr.:", "()", "dienst", "Zs/?", "streife"]
                    ]
        },

        "ZOBEL" : {
            cols : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            rows : ["1", "4", "6"],
            chars : [
                        ["I", "", "N", "S", "", "E", "", "T", "R", "Cs"],
                        ["F", "V", "K", "B", "Ö", ",", "Z", "-", ".", "X"],
                        ["ß", "H", "Ü", "/", "Q", "W", "D", "J", "Ä", "G"],
                        ["L", "O", "A", "Zs", "U", "P", "C", "M", "?", "Y"]
                    ]
        }
    };


    public decode(inputString:string, mode:string = ""):string {

        let returnString:string = "";

        if (this.LookUpDict.hasOwnProperty(mode)) {
            inputString = inputString.replace(/[^0-9]+/g, "");

            if (inputString) {
                let stringOffset:number = 0;

                while (stringOffset < inputString.length) {
                    let row:number = this.LookUpDict[mode].rows.indexOf(inputString[stringOffset]);

                    if (row >= 0) {
                        if (stringOffset < inputString.length - 1) {
                            stringOffset++;
                            row++; // 1-based
                        } else {
                            break;
                        }
                    } else {
                        row = 0;
                    }

                    let col:number = this.LookUpDict[mode].cols.indexOf(inputString[stringOffset]);

                    stringOffset++;

                    returnString += this.LookUpDict[mode].chars[row][col];
                }
            }
        }

        return returnString;
    }

}
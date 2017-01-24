/** 
  * @desc Copiale Code class
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
    [key: string] : string;
};

export class Copiale {

    private lookUp:IPattern;

    constructor() {
        this.lookUp = {
						"a" : " ",
						"b" : " ",
						"c" : " ",
						"ds" : " ",
						"e" : " ",
						"ft" : " ",
						"gs" : " ",
						"h" : " ",
						"i" : " ",
						"k" : " ",
						"l" : " ",
						"m" : " ",
						"n" : " ",
						"o" : " ",
						"p" : " ",
						"q" : " ",
						"r" : " ",
						"s" : " ",
						"longs" : " ",
						"t" : " ",
						"u" : " ",
						"v" : " ",
						"w" : " ",
						"x" : " ",
						"y" : " ",
						"zs" : " ",
						"p." : "a",
						"n." : "a",
						"h." : "a",
						"fem" : "ä",
						"sqp" : "b",
						"bas" : "c",
						"pi" : "d",
						"z" : "d",
						"ah" : "e",
						"eh" : "e",
						"ih" : "e",
						"oh" : "e",
						"uh" : "e",
						"grr" : "e",
						"zzz" : "e",
						"sqi" : "f",
						"del" : "g",
						"hd" : "h",
						"y.." : "i",
						"ns" : "i",
						"iot" : "i",
						"car" : "j",
						"gam" : "k",
						"c." : "l",
						"plus" : "m",
						"mu" : "n",
						"ru" : "n",
						"nu" : "n",
						"g" : "n",
						"tri" : "o",
						"o." : "o",
						"no" : "ö",
						"d" : "p",
						"r." : "r",
						"three" : "r",
						"j" : "r",
						"bar" : "s",
						"grc" : "s",
						"lam" : "t",
						"ni" : "u",
						"ki" : "u",
						"grl" : "ü",
						"mal" : "v",
						"m." : "w",
						"f" : "x",
						"inf" : "y",
						"s." : "z",
						"cross" : "sch",
						"hk" : "st",
						"arr" : "ch",
						"uu" : "en",
						"." : ".",
						"nee" : "meister",
						"o.." : "gesellschaft",
						"tri.." : "loge",
						"bigx" : "orden",
						"lip" : "okulist",
						"star" : "geheimwissen",
						"toe" : "macht",
						"gat" : "tisch"
                    };
    }

    public decode(inputString:string):string {

        let returnStr:string = "";

        // Remove unneeded chars
		inputString = inputString.replace(/[^A-Z\.\s\r\n:]+/igm, " ").toLowerCase();

        if (inputString) {
            let parts:Array<string> = inputString.split(/[\s\r\n]/g);

            if (parts) {
                returnStr = parts.map(function (pattern:string, index:number) {
                    if (":" === pattern) {
                        return (index < 0) ? parts[index - 1] : pattern;
                    } else if (this.lookUp.hasOwnProperty(pattern)) {
                        return this.lookUp[pattern];
                    }
                    return "";
                }.bind(this)).join("");
            }
        }

        return returnStr;
	}
}
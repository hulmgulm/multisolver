/** 
  * @desc Brainfuck Code class
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

interface LoopDictionary {
    [start:number] : number;
};

interface OokDict {
    [identifier:string] : string;
};

export class Brainfuck {

    ookDict:OokDict = {
        ".." : "+",
        "!!" : "-",
        ".?" : ">",
        "?." : "<",
        "!?" : "[",
        "?!" : "]",
        "!." : ".",
        ".!" : ","
    };

    public interpret(code:string, input:string = ""):string {
        code = code.replace(/[^<>+\-\.,\[\]]+/g, "");

        let returnValue = "";

        if ( this.isValidCode(code) ) {

            let inputPointer = 0;
            let codePointer:number = 0;
            let memoryPointer:number = 0;
            let memory:number[] = [0];
            let bits:number = 8; // Todo: implement 16, 32, ... bits
            let loopStack:number[] = [];
            let loopDictionary:LoopDictionary = this.buildLoopDictionary(code);

            while (codePointer < code.length) {
                switch (code[codePointer]) {
                    case "+": {
                        memory[memoryPointer] = (memory[memoryPointer] + 1) % Math.pow(2, bits);
                        break;
                    }
                    case "-": {
                        memory[memoryPointer] = (Math.pow(2, bits) + memory[memoryPointer] - 1) % Math.pow(2, bits);
                        break;
                    }
                    case ">": {
                        memoryPointer++;
                        if (memoryPointer === memory.length) {
                            memory.push(0);
                        }
                        break;
                    }
                    case "<": {
                        if (0 === memoryPointer) {
                            memory.unshift(0);
                        } else {
                            memoryPointer--;
                        }
                        break;
                    }
                    case "[": {
                        if (0 !== memory[memoryPointer]) {
							loopStack.push(codePointer);
						} else {
							// Jump to end of loop
							codePointer = loopDictionary[codePointer];
						}
                        break;
                    }
                    case "]": {
                        codePointer = loopStack.pop() - 1;
                        break;
                    }
                    case ".": {
                        if (memory[memoryPointer]) {
                            returnValue += String.fromCharCode(memory[memoryPointer]);
                        }
                        break;
                    }
                    case ",": {
                        if (inputPointer < input.length) {
                            memory[memoryPointer] = input.charCodeAt(inputPointer++);
                        } else {
                            memory[memoryPointer] = 0;
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }

                codePointer++;
            }
        }

        return returnValue;
    }

    public ook(code:string, input:string = ""):string {
        code = code.replace(/[^\.!?]/g, '');

        let opCodes:RegExpMatchArray = code.match(/.{2,2}/g);

        return opCodes ? this.interpret(opCodes.map(function(p:string):string {
                return this.ookDict.hasOwnProperty(p) ? this.ookDict[p] : '';
            }, this).join(""), input) : "";
    }

    public isValidCode(code:string):boolean {
        code = code.replace(/[^\[\]]/g, '');
        let oldLength:number;

        do {
            oldLength = code.length;
            code = code.replace(/(\[\])+/g, '');
        } while (code.length !== oldLength);

        return 0 === code.length;
    }

    private buildLoopDictionary(code:string):LoopDictionary {

        let loopDictionary:LoopDictionary = {};
        let loopStack:number[] = [];

        code.split("").map(function(c:string, index:number) {
            if (c === "[") {
                loopStack.push(index);
            } else if (c === "]") {
                loopDictionary[loopStack.pop()] = index;
            }
        });

        return loopDictionary;

    }
}
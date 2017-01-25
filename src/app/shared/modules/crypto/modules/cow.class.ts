/** 
  * @desc Cow Code class
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

interface LoopUp {
    [identifier: string] : number;
};

export class Cow {

    // Opcodes
    private readonly OP_BRACKET_CLOSE:number = 0;
    private readonly OP_MOVE_LEFT:number = 1;
    private readonly OP_MOVE_RIGHT:number = 2;
    private readonly OP_EXECUTE_PTR:number = 3;
    private readonly OP_I_O:number = 4;
    private readonly OP_DEC:number = 5;
    private readonly OP_INC:number = 6;
    private readonly OP_BRACKET_OPEN:number = 7;
    private readonly OP_ZERO:number = 8;
    private readonly OP_REG:number = 9;
    private readonly OP_PRINT:number = 10;
    private readonly OP_READ:number = 11;

    // Opcode lookup
    readonly OpcodeLookup:LoopUp = {
        "moo" : this.OP_BRACKET_CLOSE,
		"mOo" : this.OP_MOVE_LEFT,
		"moO" : this.OP_MOVE_RIGHT,
		"mOO" : this.OP_EXECUTE_PTR,
		"Moo" : this.OP_I_O,
		"MOo" : this.OP_DEC,
		"MoO" : this.OP_INC,
		"MOO" : this.OP_BRACKET_OPEN,
		"OOO" : this.OP_ZERO,
		"MMM" : this.OP_REG,
		"OOM" : this.OP_PRINT,
		"oom" : this.OP_READ
    };

    private codePointer:number = 0;
    private opCodes:Array<number> = [];
    private memoryPointer:number = 0;
    private memory:Array<number> = [];
    private returnString:string = "";
    private stdinPointer:number = 0;
    private stdin:string = "";
    private register:number = null;

    public interpret(code:string, input:string = ""):string {

        // init
        this.codePointer = 0;
        this.opCodes = [];
        this.memoryPointer = 0;
        this.memory = [ 0 ];
        this.returnString = "";
        this.stdinPointer = 0;
        this.stdin = input;
        this.register = null;

        // sanitize code
        code = code.replace(/[^mo]+/ig, "");

        if (code) {
            code.match(/[mo]{3,3}/ig).map(function (opCode:string) {
                if (this.OpcodeLookup.hasOwnProperty(opCode)) {
                    this.opCodes.push(this.OpcodeLookup[opCode]);
                }
            }, this);
        }

        let startTime:number = performance.now();
        let step:number = 0;

        while (this.codePointer < this.opCodes.length) {
            if (step % 10000 === 0) {
                let currentTime:number = performance.now();

                if (currentTime - startTime > 10 * 1000) {
                    break;
                }
            }

            this.do_step(this.opCodes[this.codePointer]);

            this.codePointer++;
            step++;
        }

        return this.returnString;
    }

    private do_step (opCode:number) {
        switch (opCode) {
            case this.OP_BRACKET_CLOSE: {
				if (this.memory[this.memoryPointer] !== 0) {
                    let closedBrackets:number = 0;

                    while (this.codePointer >= 0) {
                        if (this.opCodes[this.codePointer] === this.OP_BRACKET_CLOSE) {
                            closedBrackets++;
                        } else if (this.opCodes[this.codePointer] === this.OP_BRACKET_OPEN) {
                            closedBrackets--;

                            if (closedBrackets === 0) {
                                break;
                            } else if (closedBrackets < 0) {
                                // too many opening brackets
                                this.codePointer = this.opCodes.length;
                                break;
                            }
                        }

                        this.codePointer--;
                    }

                    if (this.codePointer < 0) {
                        // Error case
                        this.codePointer = this.opCodes.length;
                    }
				}
				break;
            }
            case this.OP_MOVE_LEFT: {
                if (this.memoryPointer > 0) {
					this.memoryPointer--;
				} else {
					this.memory.unshift(0);
				}
				break;
            }
            case this.OP_MOVE_RIGHT: {
                this.memoryPointer++;
				if (this.memoryPointer === this.memory.length) {
					this.memory.push(0);
				}
				break;
            }
            case this.OP_EXECUTE_PTR: {
                if (this.memory[this.memoryPointer] !== this.OP_EXECUTE_PTR
                    && this.memory[this.memoryPointer] <= this.OP_READ) {
					this.do_step(this.memory[this.memoryPointer]);
				}
				break;
            }
            case this.OP_I_O: {
                if (this.memory[this.memoryPointer] !== 0) {
					this.returnString += String.fromCharCode(this.memory[this.memoryPointer]);
				} else {
					if (this.stdinPointer < this.stdin.length) {
						this.memory[this.memoryPointer] = this.stdin.charCodeAt(this.stdinPointer);
						this.stdinPointer++;
					}
				}
				break;
            }
            case this.OP_DEC: {
                this.memory[this.memoryPointer]--;
                break;
            }
            case this.OP_INC: {
                this.memory[this.memoryPointer]++;
                break;
            }
            case this.OP_BRACKET_OPEN: {
				if (this.memory[this.memoryPointer] === 0) {
                    let openBrackets:number = 0;

                    while (this.codePointer < this.opCodes.length) {
                        if (this.opCodes[this.codePointer] === this.OP_BRACKET_OPEN) {
                            openBrackets++;
                        } else if (this.opCodes[this.codePointer] === this.OP_BRACKET_CLOSE) {
                            openBrackets--;

                            if (openBrackets === 0) {
                                break;
                            } else if (openBrackets < 0) {
                                // too many closing brackets
                                this.codePointer = this.opCodes.length;
                                break;
                            }
                        }

                        this.codePointer++;
                    }
				}
				break;
            }
            case this.OP_ZERO: {
                this.memory[this.memoryPointer] = 0;
                break;
            }
            case this.OP_REG: {
                if (this.register == null) {
                    this.register = this.memory[this.memoryPointer];
                } else {
                    this.memory[this.memoryPointer] = this.register;
                    this.register = null;
                }
                break;
            }
            case this.OP_PRINT: {
                if (this.memory[this.memoryPointer] > 0) {
                    this.returnString += this.memory[this.memoryPointer].toString();
                }
                break;
            }
            case this.OP_READ: {
                let integerStr:RegExpMatchArray = this.stdin.substring(this.stdinPointer).match(/\d+/);

                if (integerStr) {
                    this.stdinPointer += integerStr.index + integerStr[0].length;
                    this.memory[this.memoryPointer] = parseInt(integerStr[0], 10);
                } else {
                    this.memory[this.memoryPointer] = 0;
                }
                break;
            }
            default: {
                return;
            }
        }
    }
}
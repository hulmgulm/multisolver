/** 
  * @desc ASCII Helper class
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

import { ASCII } from './ascii.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _ASCII extends ASCII {

    private _Identifier:string = "ASCII";
    private _IdentifierPostfixBinary:string = "BINARY";
    private _IdentifierPostfixBinary8Bit:string = "8BIT";
    private _IdentifierPostfixBinary8BitInversed:string = "8BIT_INVERSED";
    private _IdentifierPostfixBinary7Bit:string = "7BIT";
    private _IdentifierPostfixBinary7BitInversed:string = "7BIT_INVERSED";
    private _IdentifierPostfixBinaryGuess:string = "GUESS";

    /*
     *  Main routine
     */
    public do() {

        interface IReturnData {
            identifier: string;
            folders: Array<Object>;
        };

        let returnData:IReturnData = {
            "identifier" : this._Identifier,
            "folders" : []
        };

        /* Binary */
        if ( this.checkConstraintsBinary() ) {

            let inputString:string = DataContainers.getInstance().getData("Digits");
            let identifier:string = this._Identifier + "_" + this._IdentifierPostfixBinary;

            let tmpFolder:{identifier:string, data:string}[] = [];

            let identifierBinary8Bit:string = identifier + "_" + this._IdentifierPostfixBinary8Bit;
            let dataBinary8Bit:string = super.decodeBinary(inputString);
            if (dataBinary8Bit) {
                tmpFolder.push({"identifier" : identifierBinary8Bit, "data" : dataBinary8Bit});
            }

            let identifierBinary8BitInversed:string = identifier + "_" + this._IdentifierPostfixBinary8BitInversed;
            let dataBinary8BitInversed:string = super.decodeBinary(inputString, true);
            if (dataBinary8BitInversed) {
                tmpFolder.push({"identifier" : identifierBinary8BitInversed, "data" : dataBinary8BitInversed});
            }

            let identifierBinary7Bit:string = identifier + "_" + this._IdentifierPostfixBinary7Bit;
            let dataBinary7Bit:string = super.decodeBinary(inputString, false, true);
            if (dataBinary7Bit) {
                tmpFolder.push({"identifier" : identifierBinary7Bit, "data" : dataBinary7Bit});
            }

            let identifierBinary7BitInversed:string = identifier + "_" + this._IdentifierPostfixBinary7BitInversed;
            let dataBinary7BitInversed:string = super.decodeBinary(inputString, true, true);
            if (dataBinary7BitInversed) {
                tmpFolder.push({"identifier" : identifierBinary7BitInversed, "data" : dataBinary7BitInversed});
            }

            if (tmpFolder.length) {
                returnData.folders.push({"identifier" : identifier, "folders" : tmpFolder});
            }
        }

        if (this.checkConstraintsBinaryGuess()) {
            let inputString:string = DataContainers.getInstance().getData("NonWhitespace");
            let identifier:string = this._Identifier + "_" + this._IdentifierPostfixBinary + "_" + this._IdentifierPostfixBinaryGuess;

            let identifierBinary8Bit:string = identifier + "_" + this._IdentifierPostfixBinary8Bit;
            let tmpFolder8Bit:IReturnData = {
                "identifier" : identifierBinary8Bit,
                "folders" : []
            };
            let dataBinary8Bit:string[] = super.guess(inputString);
            for (let d:number = 0; d < dataBinary8Bit.length; d++) {
                let i:string = identifierBinary8Bit + "_" + (d + 1).toString();
                tmpFolder8Bit.folders.push({"identifier" : i, "data" : dataBinary8Bit[d]});
            }

            let identifierBinary7Bit:string = identifier + "_" + this._IdentifierPostfixBinary7Bit;
            let tmpFolder7Bit:IReturnData = {
                "identifier" : identifierBinary7Bit,
                "folders" : []
            };
            let dataBinary7Bit:string[] = super.guess(inputString, true);
            for (let d:number = 0; d < dataBinary7Bit.length; d++) {
                let i:string = identifierBinary7Bit + "_" + (d + 1).toString();
                tmpFolder7Bit.folders.push({"identifier" : i, "data" : dataBinary7Bit[d]});
            }

            if (tmpFolder8Bit.folders.length) {
                returnData.folders.push(tmpFolder8Bit);
            }

            if (tmpFolder7Bit.folders.length) {
                returnData.folders.push(tmpFolder7Bit);
            }

        }

        return returnData;
    }

    private checkConstraintsBinary():boolean {
       return DataContainers.getInstance().getData("Digits").length > 0;
    }

    private checkConstraintsBinaryGuess():boolean {
       return DataContainers.getInstance().uniqueChars("NonWhitespace") === 2;
    }

}
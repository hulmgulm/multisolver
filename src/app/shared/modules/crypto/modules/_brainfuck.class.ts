/** 
  * @desc Brainfuck Helper class
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

import { Brainfuck } from './brainfuck.class';
import { DataContainers } from '../data-containers/dataContainers.class';
import { PasswordContainers } from '../data-containers/passwordContainers.class';

export class _Brainfuck extends Brainfuck {

    private _Identifier:string = "BRAINFUCK";
    private _IdentifierPostfixNormal:string = "NORMAL";
    private _IdentifierPostfixOok:string = "OOK";

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

        /* Normal */
        if ( this.checkConstraintsNormal() ) {

            let data:string = super.interpret(
                                    DataContainers.getInstance().getData("NonAlphaNum"),
                                    PasswordContainers.getInstance().getData("Trimmed")
                                );
            let identifierNormal:string = this._Identifier + "_" + this._IdentifierPostfixNormal;

            if (data) {
                returnData.folders.push({"identifier" : identifierNormal, "data" : data});
            }
        }

        /* Ook */
        if ( this.checkConstraintsNormal() ) {

            let data:string = super.ook(
                                    DataContainers.getInstance().getData("NonAlphaNum"),
                                    PasswordContainers.getInstance().getData("Trimmed")
                                );
            let identifierOok:string = this._Identifier + "_" + this._IdentifierPostfixOok;

            if (data) {
                returnData.folders.push({"identifier" : identifierOok, "data" : data});
            }
        }

        return returnData;
    }

    /*
     *  Checks if the constraints for 'normal' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsNormal():boolean {
       return DataContainers.getInstance().getData("NonAlphaNum").length > 0;
    }
}
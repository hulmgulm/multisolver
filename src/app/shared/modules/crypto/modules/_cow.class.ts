/** 
  * @desc Cow Helper class
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

import { Cow } from './cow.class';
import { DataContainers } from '../data-containers/dataContainers.class';
import { PasswordContainers } from '../data-containers/passwordContainers.class';

export class _Cow extends Cow {

    private _Identifier:string = "COW";
    private _IdentifierPostfixNormal:string = "NORMAL";

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
                                    DataContainers.getInstance().getData("AlphaLatin"),
                                    PasswordContainers.getInstance().getData("Trimmed")
                                );
            let identifierNormal:string = this._Identifier + "_" + this._IdentifierPostfixNormal;

            if (data) {
                returnData.folders.push({"identifier" : identifierNormal, "data" : data});
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
       return DataContainers.getInstance().getData("AlphaLatin").length > 0;
    }
}
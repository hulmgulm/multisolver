/** 
  * @desc Abaddon Helper class
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

import { Abaddon } from './abaddon.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Abaddon extends Abaddon {

    private _Identifier:string = "ABADDON";
    // private _IdentifierPostfixNormal:string = "NORMAL";

    /*
     *  Main routine
     */
    public do() {

        let returnData = {
            "identifier" : this._Identifier,
            "data" : ""
        };

        /* Normal */
        if ( this.checkConstraintsNormal() ) {

            let inputString = DataContainers.getInstance().getData("NonAlphaNum");
            // let identifierNormal:string = this._Identifier + "_" + this._IdentifierPostfixNormal;

            returnData.data = super.decode(inputString);

        }

        return returnData;
    }

    /*
     *  Checks if the constraints for 'normal' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsNormal():boolean {
       // We need at least a char to rotate
       return DataContainers.getInstance().getData("NonAlphaNum").length > 0;
    }
}
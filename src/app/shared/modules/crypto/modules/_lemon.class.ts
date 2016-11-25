/** 
  * @desc Lemon Helper class
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

import { Lemon } from './lemon.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Lemon extends Lemon {

    private _Identifier:string = "LEMON";

    /*
     *  Main routine
     */
    public do() {

        let returnData = {
            "identifier" : this._Identifier,
            "folders" : []
        };

        if ( this.checkConstraints() ) {
            let inputString:string = DataContainers.getInstance().getData("Trimmed");
            returnData.folders.push({"identifier" : this._Identifier + "_CLOCKWISE", "data" : super.decipher(inputString)});
            returnData.folders.push({"identifier" : this._Identifier + "_COUNTERCLOCKWISE", "data" : super.decipher(inputString, true)});
        }

        return returnData;
    }

    /*
     *  Checks if the constraints are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("Trimmed").length > 0;
    }
}
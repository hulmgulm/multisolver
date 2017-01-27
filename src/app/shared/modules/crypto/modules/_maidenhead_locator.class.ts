/** 
  * @desc Maidenhead Locator Helper class
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

import { MaidenheadLocator } from './maidenhead_locator.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _MaidenheadLocator extends MaidenheadLocator {

    private _Identifier:string = "MAIDENHEAD_LOCATOR";

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

        if ( this.checkConstraintsCodes2Coords() ) {

            let inputString = DataContainers.getInstance().getData("AlphaLatinNumWhiteSpace");

            let coords:string = super.codes2Coords(inputString);

            returnData.folders.push({"identifier" : this._Identifier, "data" : coords});
        }

        return returnData;
    }

    /*
     *  Checks if the constraints are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsCodes2Coords():boolean {
       return DataContainers.getInstance().getData("AlphaLatinNum").length > 0;
    }
}
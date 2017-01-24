/** 
  * @desc EnclosedAreas Helper class
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

import { EnclosedAreas } from './enclosed_areas.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _EnclosedAreas extends EnclosedAreas {

    private _Identifier:string = "ENCLOSED_AREAS";
    private _IdentifierPostfixWithFour:string = "WITH_4";
    private _IdentifierPostfixWithoutFour:string = "WITHOUT_4";

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

        if ( this.checkConstraints() ) {

            let identifierWithFour:string = this._Identifier + "_" + this._IdentifierPostfixWithFour;
            let identifierWithoutFour:string = this._Identifier + "_" + this._IdentifierPostfixWithoutFour;

            returnData.folders.push({   "identifier" : identifierWithFour,
                                        "data" : super.count(DataContainers.getInstance().getData("Trimmed")) });
            returnData.folders.push({   "identifier" : identifierWithoutFour,
                                        "data" : super.count(DataContainers.getInstance().getData("Trimmed"), false) });
        }

        return returnData;
    }

    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("Trimmed").length > 0;
    }
}
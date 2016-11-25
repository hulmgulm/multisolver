/** 
  * @desc Bifid Helper class
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

import { Bifid } from './bifid.class';
import { DataContainers } from '../data-containers/dataContainers.class';
import { PasswordContainers } from '../data-containers/passwordContainers.class';

export class _Bifid extends Bifid {

    private _Identifier:string = "BIFID";

    /*
     *  Main routine
     */
    public do() {

        interface IReturnData {
            identifier: string;
            data: string;
        };

        let returnData:IReturnData = {
            "identifier" : this._Identifier,
            "data" : ""
        };

        if ( this.checkConstraints() ) {

            let inputString = DataContainers.getInstance().getData("AlphaLatin");
            let password:string = PasswordContainers.getInstance().getData("AlphaLatin");

            returnData.data = super.decipher(inputString, password);
        }

        return returnData;
    }

    private checkConstraints():boolean {
       // We need at least a char to rotate
       return DataContainers.getInstance().getData("AlphaLatin").length > 0;
    }

}
/** 
  * @desc Trithemius Helper class
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

import { Trithemius } from './trithemius.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Trithemius extends Trithemius {

    private _Identifier:string = "TRITHEMIUS";

    /*
     *  Main routine
     */
    public do() {

        let returnData = {
            "identifier" : this._Identifier,
            "data" : ""
        };

        if ( this.checkConstraints() ) {
            let inputString:string = DataContainers.getInstance().getData("Trimmed");
            returnData.data = super.decipher(inputString);
        }

        return returnData;
    }

    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("AlphaLatin").length > 0;
    }
}
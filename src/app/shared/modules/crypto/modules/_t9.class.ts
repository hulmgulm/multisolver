/** 
  * @desc T9 Helper class
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

import { T9 } from './t9.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _T9 extends T9 {

    private _Identifier:string = "T9";

    /*
     *  Main routine
     */
    public do() {

        let returnData = {
            "identifier" : this._Identifier,
            "data" : ""
        };

        if ( this.checkConstraints() ) {
            returnData.data = super.decode(DataContainers.getInstance().getData("DigitsWhiteSpace"));
        }

        return returnData;
    }

    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("Digits").length > 0;
    }
}
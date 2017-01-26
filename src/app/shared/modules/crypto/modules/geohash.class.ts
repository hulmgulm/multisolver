/** 
  * @desc Geohash Code class
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

export class Geohash {

    private readonly lookUp:string = "0123456789bcdefghjkmnpqrstuvwxyz";

    public code2Coord(code:string):Array<number> {

        let coord:number[] = [];

        code = code.replace(/[^0-9b-hjkmnp-z\s\r\n]+/ig, "").toLowerCase();

        if (coord) {

            let bits:string = "";
            for (let c of code) {
                let tmp:string = this.lookUp.indexOf(c).toString(2);
                bits += "00000".substring(tmp.length) + tmp;
            }

            let lonBits:string = "";
            let latBits:string = "";
            let index:number = 0;
            for (let b of bits) {
                if (index % 2 === 0) {
                    lonBits += b;
                } else {
                    latBits += b;
                }
                index++;
            }

            let longitude:number = 0;
            let testMin:number = -180;
            let testMax:number = 180;
            for (let b of lonBits) {
                if ('1' === b) {
                    testMin = longitude;
                } else {
                    testMax = longitude;
                }
                longitude = (testMax + testMin) / 2;
            }

            let latitude = 0;
            testMin = -90;
            testMax = 90;
            for (let b of latBits) {
                if ('1' === b) {
                    testMin = latitude;
                } else {
                    testMax = latitude;
                }
                latitude = (testMax + testMin) / 2;
            }

            coord = [latitude, longitude];
        }

        return coord;
    }

    public codes2Coords(codes:Array<string>):Array<string> {
        let coords:Array<string> = [];

        for (let code of codes) {
            let coord:Array<number> = this.code2Coord(code);

            if (coord) {
                coords.push(this.beautifyCoord(coord));
            }
        }

		return coords;
    }

    private beautifyCoord(coord:Array<number>):string {
        let lat:number = coord[0];
        let lon:number = coord[1];
        let signLat:string = lat >= 0 ? "N" : "S";
        let signLon:string = lon >= 0 ? "E" : "W";

        lat = Math.abs(lat);
        lon = Math.abs(lon);

        return signLat + lat.toString() + " " + signLon + lon.toString();
    }
}
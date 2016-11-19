export namespace StringHelper {

    export function getNumberOfUniqueChars(s:string):number {

        interface ICounter {
            [char: string]: number;
        };

        let dict:ICounter = {};
        let counter:number = 0;

        for (let c of s){
            if ( !(c in dict) ) {
                dict[c] = 1;
                counter++;
            }
        }

        return counter;
    }

}
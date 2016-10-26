export namespace StringHelper{
    
    export function getNumberOfUniqueChars(s:string){
        
        let dict = {};
        let counter = 0;

        for(let c of s){
            if( !(c in dict) ){
                dict[c] = 1;
                counter++;
            }
        }

        return counter;
    }

}
import { DataContainers } from './crypto/data-containers/dataContainers.class';
import { _Rotations } from './crypto/modules/_rotations.class';

export class MSCrypto {

    private _modules = [
        new _Rotations()
    ];

    public do(inputString:string, password1:string, password2:string) {

        let data = {
            "modules" : []
        };

        // Initialize data containers
        let Data = DataContainers.getInstance();
        Data.setData(inputString);

        for (let module of this._modules) {
            data.modules.push(module.do());
        }

        return data;
    }
}
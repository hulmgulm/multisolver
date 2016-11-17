import { DataContainers } from './crypto/data-containers/dataContainers.class';
import { PasswordContainers } from './crypto/data-containers/passwordContainers.class';
import { _Abaddon } from './crypto/modules/_abaddon.class';
import { _ADFVGX } from './crypto/modules/_adfvgx.class';
import { _Rotations } from './crypto/modules/_rotations.class';

export class MSCrypto {

    private _modules = [
        new _Abaddon(),
        new _ADFVGX(),
        new _Rotations()
    ];

    public do(inputString:string, password1:string, password2:string) {

        let data = {
            "modules" : []
        };

        // Initialize data containers
        let Data:DataContainers = DataContainers.getInstance();
        Data.setData(inputString);

        // Initialize password containers
        let Passwords:PasswordContainers = PasswordContainers.getInstance();
        Passwords.setPasswords([password1, password2]);

        for (let module of this._modules) {
            data.modules.push(module.do());
        }

        return data;
    }
}
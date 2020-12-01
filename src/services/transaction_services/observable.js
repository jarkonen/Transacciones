import { Observable } from "rxjs";
import {sendMail} from '../../../src/services/user_services/user.services';

function GetObservable(l1, l2){

    const observable = new Observable(observer => {

        observer.next(sendMail(l1,l2));

    }); 

    observable.subscribe({
        next: x => console.log(x),
        error: err => console.error('error: ' + err),
        complete: () => console.log('completo¡¡¡'),
        });

}

export {GetObservable};
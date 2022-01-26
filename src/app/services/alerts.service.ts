import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {

  success( msg: string ) {

    Swal.fire({
      icon: 'success',
      title: `${ msg }`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  error( msg: any ) {
    
    console.log(msg);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });

  }

}

import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {

  success( title:string, msg: string ) {

    Swal.fire({
      icon: 'success',
      title: `${ title }`,
      text: `${ msg }`,
      showConfirmButton: false,
      timer: 1500,
    });

    // Swal.fire(
    //   'Deleted!',
    //   'Your file has been deleted.',
    //   'success',
    // );
  }

  confirm(): Promise< SweetAlertResult >{


    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#473fce',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     deleteVerb =  true;
    //   }
    // });

  }

  error( msg: any ) {
    
    console.log(msg);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });

  }

  info( msg: any ) {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: `${ msg  }`,
    });

  }

  // loading( msg: string ) {

  // }

}

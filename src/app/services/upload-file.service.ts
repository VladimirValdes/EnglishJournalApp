import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.mode';

const BASE_URL = environment.base_url;


@Injectable({
  providedIn: 'root',
})
export class UploadFileService {

 
  constructor( private http: HttpClient ) { }

  updateImage( file: File, id: string ): Observable<string> {
    
    const formData = new FormData();
    
    formData.append('file', file );

    return  this.http.put<User>(`${BASE_URL}/uploads/users/${ id }`, formData ).pipe(
      map( user => {
        return user.img;
      }),
    );
  }
}

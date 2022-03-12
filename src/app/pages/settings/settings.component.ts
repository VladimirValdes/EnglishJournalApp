import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user.mode';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  user!: User;

  file!: File; 

  uploadImage!:File;

  imageTemp: any;

  validateExtensions = ['jpg', 'png', 'gif', 'jpeg'];

  
  @ViewChild('closebtn') closebtn!: ElementRef;


  constructor( private userService: AuthService,
    private alertService: AlertsService,
    private uploadService: UploadFileService) {
    this.user = this.userService.user;

  }


  onFileInput( files: FileList | null ): void {

    if ( files ) {
      this.uploadImage = files[0];
      const cutImage = this.uploadImage.name.split('.');
      const extension = cutImage[cutImage.length - 1];


      if (!this.validateExtensions.includes(extension)) {
        this.alertService.error(`This ${ extension } is not valid, valid extensions are ${ this.validateExtensions }`);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.uploadImage);

      reader.onloadend =  () => {
        this.imageTemp = reader.result;
        
      };
    }
  }

  uploadImg() {
    this.uploadService.updateImage( this.uploadImage, this.userService.uid )
      .subscribe( image => {
        this.user.img = image;
        this.alertService.success('Image Update', 'Your image was updated successful');
        this.closebtn.nativeElement.click();
      });
  }

  close() {
    this.imageTemp = null;
  }

}

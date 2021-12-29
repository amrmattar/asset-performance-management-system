import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewChecked, ChangeDetectorRef, ElementRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Repository } from '../../../data/repository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent  {
  @ViewChild('takeInput', {static: false})
    
// this InputVar is a reference to our input.
  
  InputVar: ElementRef;
  
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  @Output() public onUploadFinished = new EventEmitter();
  public progress: number;
  public message: string;
  //config = {
  //  url: 'https://httpbin.org/post',
  //  thumbnailWidth: 160,
  //  // tslint:disable-next-line: max-line-length
  //  previewTemplate: '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>'
  //};
  public config: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  constructor(private http: HttpClient,private cd: ChangeDetectorRef) {

  }
  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
     
    console.log(event[0]);
    this.uploadFile(event[0]);
  }
  
  public uploadFile = (file) => {
     
    //if (files.length === 0) {
    //  return;
    //}

    //let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.http.post( environment.apiUrl+'/api/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          console.log(this.message);
          this.onUploadFinished.emit(event.body);
        }
      });
  }
 
   showFile(filename, filepath)
  {

    //if (this.dropzone.nativeElement.dropzone != null ) {
    //  var mockFile = { name: filename, size: 12345 };
    //  console.log(mockFile);
    //this.dropzone.options.addedFiles(mockFile);
    //this.dropzone.options.createThumbnailFromUrl(filename, filepath);
    //  this.dropzone.complete(mockFile);
    console.log(this.directiveRef.dropzone());
    var mockFile = { name: filename, size: 12345, accepted: true };
    this.directiveRef.dropzone().options.addedfile.call(this.directiveRef.dropzone(), mockFile);
    this.directiveRef.dropzone().options.thumbnail.call(this.directiveRef.dropzone(), mockFile, filepath);
    //}
  }

  files;
  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      this.files=event.target.files;
      //this.upload();
      //reader.readAsDataURL(th);
      this.upload(this.files);

      reader.onload = () => {
        // this.formGroup.patchValue({
        //   file: reader.result
        // });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }

 
  }

  upload(files) {
    if(files!=null){
     if (files.length === 0)
       return;
     const formData = new FormData();
     for (let file of files)
       formData.append(file.name, file);
    
      // formData.append('',);
     //   const uploadReq = new HttpRequest('POST', 'https://localhost:5001/api/RealEstate/uploadunitfile', formData, {
     //   reportProgress: true,
     // });


     this.http.post( environment.apiUrl+'/api/upload', formData, { reportProgress: true, observe: 'events' })
     .subscribe(event => {
       if (event.type === HttpEventType.UploadProgress)
         this.progress = Math.round(100 * event.loaded / event.total);
       else if (event.type === HttpEventType.Response) {
         this.message = 'Upload success.';
         console.log(this.message);
         this.onUploadFinished.emit(event.body);
         this.InputVar.nativeElement.value = "";
       }
     });

     }
   }
}

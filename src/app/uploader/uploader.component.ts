import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ScheduleJopService } from 'src/services/ScheduleJopService';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  files: File[] = [];
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private readonly scheduleJopService:ScheduleJopService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSelect(event) {
		console.log("event",event);
    event.addedFiles.forEach(element => {
      debugger;
      var extention=element.name.split('.').pop();
      if(extention == "xlsx"){
        let alreadyExist=this.files.find(x=>x.name == element.name);
        if(alreadyExist == undefined || alreadyExist == null){
          this.files.push(element);
        }
      }
    });

     this.messageEvent.emit(this.files);
	  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.messageEvent.emit(this.files);
    }


}

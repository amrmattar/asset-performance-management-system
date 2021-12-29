import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv';
import Helper from 'src/utilities/helper';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Injectable()
export class SharedService {
  public ENGLISH_LOCALE = 'en-US';
  public ARABIC_LOCALE = 'ar-AE';
  public currentLanguage;
  constructor(private notificationsService: NotificationsService, private translateService: TranslateService) {
    this.setCurrentLanguage();
  }

  ShowNotification(notification: Notification) {
    if (notification.type == NotificationType.Success)
      this.notificationsService.create(this.translateService.instant('notification.success'), notification.message, NotificationType.Success, { timeOut: 3000, showProgressBar: true, position: ["top", "center"] });
    else if (notification.type == NotificationType.Error)
      this.notificationsService.create(this.translateService.instant('notification.error'), notification.message, NotificationType.Error, { timeOut: 3000, showProgressBar: true, position: ["top", "center"] });
    else if (notification.type == NotificationType.Info)
      this.notificationsService.create(this.translateService.instant('notification.info'), notification.message, NotificationType.Info, { timeOut: 3000, showProgressBar: true, position: ["top", "center"] });
    else
      this.notificationsService.create(this.translateService.instant('notification.warning'), notification.message, NotificationType.Warn, { timeOut: 3000, showProgressBar: true, position: ["top", "center"] });
  }
  setCurrentLanguage() {
    this.currentLanguage = Helper.GeCurrenttLanguage();
    if (this.currentLanguage != null) {
      this.translateService.setDefaultLang(this.currentLanguage);
      this.translateService.use(this.currentLanguage);
    }
    else {
      this.translateService.setDefaultLang(this.ENGLISH_LOCALE);
      this.translateService.use(this.ENGLISH_LOCALE);
    }
  }
  getTranslation(key: string) {
    this.translateService.get(key);
  }
  exportToCSV(data:any,title:string) {
    const options = {
      filename: title + "_" + new Date().getTime(),
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: title,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
      //headers: headers
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  exportToPDF(data:any,title:string) {
    var doc = new jsPDF({
      orientation: "l"
    });
    doc.setFontSize(18);
    //doc.text('My PDF Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      head: [data.map(x => Object.keys(x))[0]],//[columns.map(x => x.prop)],
      body: data.map(x => Object.values(x)),
      theme: 'striped',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })
    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    doc.save(title + "_" + new Date().getTime() +'.pdf');
  }
}

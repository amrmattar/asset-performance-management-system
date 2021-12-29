import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';
import { TablesRepository } from 'src/app/data/tables.repository';
import { columns, FormateValue, Validation } from 'src/models/dataSheetModels/columns';
import { Rows } from 'src/models/dataSheetModels/Rows';
import { section } from 'src/models/dataSheetModels/section';
import { ColumnData } from 'src/models/requests/columnDataRequest';
import { ColumnRequest } from 'src/models/requests/ColumnRequest';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';
import { DataSheetService } from 'src/services/DataSheetService';
import { TableService } from 'src/services/TableService';
declare var hideModal: any;
@Component({
  selector: 'app-edit-section-data-sheet',
  templateUrl: './edit-section-data-sheet.component.html',
  styleUrls: ['./edit-section-data-sheet.component.scss'],
  providers: [DataSheetService, TableService]
})
export class EditSectionDataSheetComponent implements OnInit {
  ShowLayOutFlag:boolean=false;
  rows: Rows[];
  changeSectionFlag: boolean = true;
  @Input() childMessage: any = { id: 0, type: "layout" };
  selectedId: any = 0;
  countrOfId: number = 1;
  section: section[];
  ScheckSection: section[];;
  _dataSheet: SysDatasheetVm;
  ShowSection: section;
  DbColumns: ColumnData[];
  FormFlagDisabledRequired: any[];
  FormFlagDisabledValidationValue: any[];
  FormFlagDisabledRegexValue: any[];
  FlagDisabledRequired: boolean = false;
  FlagDisabledRegex: boolean = false;
  FlagDisabledValidation: boolean = false;
  constructor(private tableRepo: TablesRepository,
    private _DataSheetService: DataSheetService,
    private notifications: NotificationsService,
    private _tableService: TableService,
    private toastr: ToastrService,
    private translateService: TranslateService) {
    this.section = new Array<section>();
    this.ScheckSection = new Array<section>();
    this.ShowSection = new section();
    this.rows = new Array;
    this.FormFlagDisabledRequired = new Array;
    this.FormFlagDisabledValidationValue = new Array;
    this.FormFlagDisabledRegexValue = new Array;
  }

  ngOnInit(): void {
  }
  ngOnChanges() {
    
    this.GetDataSheetByOnLoadId(this.childMessage.id);
  }

  back() {
    this.tableRepo.showTableDataSheet = true;
    this.tableRepo.showinfoDataSheet = false;
    this.tableRepo.showSectionDataSheet = false;
  }
  selectSection(id: any) {
    this.selectedId = id;
    this.childMessage.sectionId = this.selectedId;
    this.ShowSection = this.section.find(x => x.id == this.selectedId);
    this.rows = this.ShowSection.rows;

  }

  showEditTable() {

    if (this.selectedId > 0) {
      if (this.ScheckSection.length > 0) {
        let exist = this.ScheckSection.find(x => x.id == this.selectedId);
        if ((exist != null || exist != undefined) && this.changeSectionFlag == true) {
          this.tableRepo.TableLayoutDataSheet = true;
          this.tableRepo.showTableDataSheet = false;
          this.tableRepo.showinfoDataSheet = false;
          this.tableRepo.showSectionDataSheet = false;
        } else {
          this.toastr.info(this.translateService.instant('datasheet.alertSaveSection'), 'info');
        }
      } else {
        this.toastr.info(this.translateService.instant('datasheet.alertSaveSection'), 'info');
      }

    } else {
      this.toastr.info(this.translateService.instant('datasheet.SelectSection'), 'info');
    }

  }


  AddfirstSection() {
    let sec: section = new section();
    sec.id = this.countrOfId++;
    sec.title = "new Section";
    sec.rows = new Array<Rows>();
    this.section.push(sec);

  }

  AddNewSection() {

    let sec: section = new section();
    sec.id = ++this.countrOfId;
    sec.title = "new Section";
    sec.rows = new Array<Rows>();
    this.section.push(sec);
  }


  SaveSections() {

    let res = this.find_duplicate_in_array(this.section);
    if (res.length > 0) {
      this.toastr.warning(this.translateService.instant('datasheet.SectionAlreadyExist'), 'Warnning');
    } else {
      this.changeSectionFlag = true;
      var myJSON = JSON.stringify(this.section);
      var item = new SysDatasheetVm();
      item.dskey = this.childMessage.id;
      item.jsonContent = myJSON;
      this._DataSheetService.UpdateSectionOfDataSheet(item).subscribe(res => {
        this.toastr.success(this.translateService.instant('datasheet.DataSectionAddedSuccessFully'), 'Success');
        this.GetDataSheetById(this.childMessage.id);
      })
    }

  }

  SaveSectionsOnDelete() {

    let res = this.find_duplicate_in_array(this.section);
    if (res.length > 0) {
      this.toastr.warning(this.translateService.instant('datasheet.SectionAlreadyExist'), 'Warnning');
    } else {
      this.changeSectionFlag = true;
      var myJSON = JSON.stringify(this.section);
      var item = new SysDatasheetVm();
      item.dskey = this.childMessage.id;
      item.jsonContent = myJSON;
      this._DataSheetService.UpdateSectionOfDataSheet(item).subscribe(res => {
        this.toastr.success(this.translateService.instant('datasheet.DataSectionAddedSuccessFully'), 'Success');
        this.GetDataSheetByOnLoadId(this.childMessage.id);
      })
    }

  }
  SectionDeletedId: any = 0;
  SetDeletedId(id: any) {
    this.SectionDeletedId = id;
  }
  deleteSection() {
    if (this.section.length > 1) {
      this.section = this.section.filter(x => x.id != this.SectionDeletedId)
      hideModal("deleteSection");
      this.SaveSectionsOnDelete();
    } else {
      this.toastr.info(this.translateService.instant('datasheet.AlertSelectItem'), 'info');
    }

  }

  GetDataSheetByOnLoadId(dsKey: any) {

    this._DataSheetService.GetDataSheetById(dsKey).subscribe(res => {
debugger
      this._dataSheet = res.model;
      this.section = JSON.parse(this._dataSheet.jsonContent);
      this.selectSection(this.section[0].id);
      this.ScheckSection = JSON.parse(this._dataSheet.jsonContent);
      this.countrOfId = this.section[this.section.length - 1].id;
      let cR = new ColumnRequest();
      cR.tkey = this.childMessage.tableTkey;
      this.GetAllColumns(cR);
    
    });
  }

  GetDataSheetById(dsKey: any) {

    this._DataSheetService.GetDataSheetById(dsKey).subscribe(res => {
      this._dataSheet = res.model;
      this.section = JSON.parse(this._dataSheet.jsonContent);
      this.selectSection(this.selectedId);
      this.ScheckSection = JSON.parse(this._dataSheet.jsonContent);
      this.countrOfId = this.section[this.section.length - 1].id;
      let cR = new ColumnRequest();
      cR.tkey = this.childMessage.tableTkey;
      this.GetAllColumns(cR);
    
    });
  }


  changeSection() {
    this.changeSectionFlag = false;
  }

  find_duplicate_in_array(array: section[]) {
    const count = {}
    const result = []

    array.forEach(item => {
      if (count[item.title]) {
        count[item.title] += 1
        return
      }
      count[item.title] = 1
    })

    for (let prop in count) {
      if (count[prop] >= 2) {
        result.push(prop)
      }
    }

    return result;

  }

  saveTab() {
  }

  setBehaviorOnLoad(rows: any) {

    rows.forEach(columns => {
      let CharacterColumn = columns.cols.filter(x => x.columnDataType == "Character");
      CharacterColumn.forEach((col: columns) => {
        let selectedColumn = this.DbColumns.find(x => x.ckey == col.ckey);
        let CurentBehav = JSON.parse(selectedColumn.jsonBehavior);
        //Set valid Value
        this.setValidValue(CurentBehav, col);

      });
      columns.cols.forEach(col => {
         
        col.validation = new Validation();
        col.validation.valid = true;
        if (col.ckey != undefined) {
          let selectedColumn = this.DbColumns.find(x => x.ckey == col.ckey);

          let CurentBehav = JSON.parse(selectedColumn.jsonBehavior);
          //set MaskedValue
          this.setMaskedValue(CurentBehav, col);
          //set DefaultValue
          this.setDefaultValue(CurentBehav, col);
          //set DisabledValue
          this.setDisabledValue(CurentBehav, col);
          //set HideVaild
          this.setHideVaild(CurentBehav, col);
          //set Required
          this.setRequired(CurentBehav, col);
          //checkValidationValue
          this.checkValidationValue(col, CurentBehav);
          //CheckRegex
          this.CheckRegex(col, CurentBehav);
        }

      });

    });


  }


  setValidValue(CurentBehav: any, col: any) {
    let validValue = CurentBehav.behavior.find(x => x.key == "ValidValue")
    if (validValue.typeOfValidValue == "StaticList") {
      col.ValidValue = validValue.value;
      col.typeOfValidValue = "StaticList";

    } else if (validValue.typeOfValidValue == "APMDefault") {
      col.ValidValue = validValue.value;
      col.typeOfValidValue = "APMDefault";
    }
  }

  setMaskedValue(CurentBehav: any, col: any) {
    let MaskedField = CurentBehav.behavior.find(x => x.key == "maskedField");
    col.maskedField = MaskedField.value;
  }

  setDefaultValue(CurentBehav: any, col: any) {
    let DefaultValue = CurentBehav.behavior.find(x => x.key == "DefaultValue");
    if (DefaultValue.value == "APMDefault") {
      col.value = null;
    } else {
      col.value = DefaultValue.value;
    }
  }
  setDisabledValue(CurentBehav: any, col: any) {
    let disabledValue = CurentBehav.behavior.find(x => x.key == "DisabledValue");
    if (disabledValue.value == "APMDefault") {
      col.disabled = false;
    } else if (disabledValue.value == "AlwaysDisabled") {
      col.disabled = true;
    } else if (disabledValue.value == "NeverDisabled") {
      col.disabled = false;
    }
  }
  setHideVaild(CurentBehav: any, col: any) {
    let HideValue = CurentBehav.behavior.find(x => x.key == "HideFalid");
    if (HideValue.value == "APMDefault") {
      col.HideFalid = true;
    } else if (HideValue.value == "True") {
      col.HideFalid = false;
    } else if (HideValue.value == "False") {
      col.HideFalid = true;
    }
  }
  GetAllColumns(columnRequest: ColumnRequest) {
    this._tableService.GetAllColumns(columnRequest).
      subscribe(res => {
        this.DbColumns = res.data.columnsDataList;
        this.section.forEach(element => {
          //set validValue
          this.setBehaviorOnLoad(element.rows);
        });
      })
  }


  checkRequiredValidation(col) {
    //
    let selectedColumn = this.DbColumns.find(x => x.ckey == col.ckey);
    let CurentBehav = JSON.parse(selectedColumn.jsonBehavior);
    let RequiredValue = CurentBehav.behavior.find(x => x.key == "Required");
    if (RequiredValue.value == "APMDefault") {
      col.requiredFlag = false;
      this.FormFlagDisabledRequired = this.FormFlagDisabledRequired.filter(x => x.key != col.ckey);
      let disabledFlag = { key: col.ckey, value: false };
      this.FormFlagDisabledRequired.push(disabledFlag);
    } else if (RequiredValue.value == "alwaysRequired") {
      if (col.value == 0) {
        col.requiredFlag = true;
        this.FormFlagDisabledRequired = this.FormFlagDisabledRequired.filter(x => x.key != col.ckey);
        let disabledFlag = { key: col.ckey, value: true };
        this.FormFlagDisabledRequired.push(disabledFlag);
      } else if (col.value == "") {
        col.requiredFlag = true;
        this.FormFlagDisabledRequired = this.FormFlagDisabledRequired.filter(x => x.key != col.ckey);
        let disabledFlag = { key: col.ckey, value: true };
        this.FormFlagDisabledRequired.push(disabledFlag);
      } else if (col.value == null) {
        col.requiredFlag = true;
        this.FormFlagDisabledRequired = this.FormFlagDisabledRequired.filter(x => x.key != col.ckey);
        let disabledFlag = { key: col.ckey, value: true };
        this.FormFlagDisabledRequired.push(disabledFlag);
      } else {
        col.requiredFlag = false;
        this.FormFlagDisabledRequired = this.FormFlagDisabledRequired.filter(x => x.key != col.ckey);
        let disabledFlag = { key: col.ckey, value: false };
        this.FormFlagDisabledRequired.push(disabledFlag);
      }

    } else if (RequiredValue.value == "NeverRequired") {
      col.requiredFlag = false;
      this.FormFlagDisabledRequired = this.FormFlagDisabledRequired.filter(x => x.key != col.ckey);
      let disabledFlag = { key: col.ckey, value: false };
      this.FormFlagDisabledRequired.push(disabledFlag);

    }

    let disabledOne = this.FormFlagDisabledRequired.find(x => x.value == true);
    if (disabledOne != null) {
      this.FlagDisabledRequired = true;
    } else {
      this.FlagDisabledRequired = false;
    }
  }


  setRequired(CurentBehav: any, col: any) {

    let RequiredValue = CurentBehav.behavior.find(x => x.key == "Required");
    if (RequiredValue.value == "APMDefault") {
      col.requiredFlag = false;
    } else if (RequiredValue.value == "alwaysRequired") {
      if (col.value == 0) {
        col.requiredFlag = true;
        let disabledFlag = { key: col.ckey, value: true };
        this.FormFlagDisabledRequired.push(disabledFlag);
      } else if (col.value == "") {
        col.requiredFlag = true;
        let disabledFlag = { key: col.ckey, value: true };
        this.FormFlagDisabledRequired.push(disabledFlag);
      } else if (col.value == null) {
        col.requiredFlag = true;
        let disabledFlag = { key: col.ckey, value: true };
        this.FormFlagDisabledRequired.push(disabledFlag);
      } else {
        col.requiredFlag = false;
        let disabledFlag = { key: col.ckey, value: false };
        this.FormFlagDisabledRequired.push(disabledFlag);
      }

    } else if (RequiredValue.value == "NeverRequired") {
      col.requiredFlag = false;
      let disabledFlag = { key: col.ckey, value: false };
      this.FormFlagDisabledRequired.push(disabledFlag);
    }
    let disabledOne = this.FormFlagDisabledRequired.find(x => x.value == true);
    if (disabledOne != null) {
      this.FlagDisabledRequired = true;
    } else {
      this.FlagDisabledRequired = false;
    }

  }

  setDisabledForm(rows: any) {
    rows.forEach(columns => {
      columns.cols.forEach(col => {

        let selectedColumn = this.DbColumns.find(x => x.ckey == col.ckey);
        let CurentBehav = JSON.parse(selectedColumn.jsonBehavior);
        this.setRequired(CurentBehav, col);
      });
    });
  }

  checkValidationForAll() {
    this.rows.forEach(columns => {
      columns.cols.forEach(col => {

        let selectedColumn = this.DbColumns.find(x => x.ckey == col.ckey);
        let CurentBehav = JSON.parse(selectedColumn.jsonBehavior);
        let ValidValue = CurentBehav.behavior.find(x => x.key == "ValidValue");
        if (ValidValue.typeOfValidValue != "StaticList") {
          this.checkValidationValue(col, CurentBehav);
        }
      });
    });
  }



  GetValueOfComparedColumn(columnId: any) {
    let value = 0;
    this.rows.forEach(col => {
      let comparedColumn = col.cols.find(x => x.columnId == columnId);
      if (comparedColumn != null) {
        value = col.cols.find(x => x.columnId == columnId).value;
      }

    });
    return value;
  }
  GetColumnOfComparedColumnBycKey(ckey: any) {
    let value = null;
    this.section.forEach((item: any) => {
      item.rows.forEach(col => {
        let comparedColumn = col.cols.find(x => x.ckey == ckey);
        if (comparedColumn != null) {
          value = col.cols.find(x => x.ckey == ckey);
        }

      });
    })

    return value;
  }

  checkRegexForAll() {

    this.rows.forEach(columns => {

      columns.cols.forEach(col => {

        let selectedColumn = this.DbColumns.find(x => x.ckey == col.ckey);
        let CurentBehav = JSON.parse(selectedColumn.jsonBehavior);
        let ValidValue = CurentBehav.behavior.find(x => x.key == "ValidValue");
        if (ValidValue.typeOfValidValue != "StaticList") {
          this.CheckRegex(col, CurentBehav);
        }
      });
    });
  }
  CheckRegex(col: columns, CurentBehav) {
 
    if (col.columnDataType != "Date" && col.columnDataType != "Logical" && col.value != null) {
      let FormateVal = CurentBehav.behavior.find(x => x.key == "FormateValue");


      if(FormateVal.type != "APMDefault"){
        let currecntColumnValueString = col.value.toString();
        let res = currecntColumnValueString.match(FormateVal.value);
        //not match with regex
        col.formateValue = new FormateValue();
        if (res == null) {
          col.formateValue.valid = false;
          col.formateValue.type = FormateVal.type;
          this.FormFlagDisabledRegexValue = this.FormFlagDisabledRegexValue.filter(x => x.key != col.ckey);
          let disabledFlag = { key: col.ckey, value: true };
          this.FormFlagDisabledRegexValue.push(disabledFlag);
        } else {
          col.formateValue.valid = true;
          this.FormFlagDisabledRegexValue = this.FormFlagDisabledRegexValue.filter(x => x.key != col.ckey);
          let disabledFlag = { key: col.ckey, value: false };
          this.FormFlagDisabledRegexValue.push(disabledFlag);
        }
  
        let disabledOne = this.FormFlagDisabledRegexValue.find(x => x.value == true);
        if (disabledOne != null) {
          this.FlagDisabledRegex = true;
        } else {
          this.FlagDisabledRegex = false;
        }
      }
  
      }
     
  }

  checkValidationValue(col: columns, CurentBehav: any) {

    if (col.columnDataType != "Logical" && col.value != null) {
      let validValue = CurentBehav.behavior.find(x => x.key == "validation")
      let value = this.GetValueOfComparedColumn(validValue.validValueStaticOrColumn);
      if (validValue.type == "NumericColumn") {

        if (validValue.value == "Equail" && col.columnDataType != "Date") {
          if (Number(value) == col.value) {
            col.validation.valid = true;

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Equail";

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        } if (validValue.value == "Equail" && col.columnDataType == "Date") {
          if (value == col.value) {
            col.validation.valid = true;

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Equail";

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThan" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not greaterThan value
          if (col.value > Number(value)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThan" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not greaterThan value
          if (col.value > value) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThanOrEqual" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not greaterThanOrEqual value
          if (col.value >= Number(value)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThanOrEqual" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not greaterThanOrEqual value
          if (col.value >= value) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThan" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not LessThan value
          if (col.value < Number(value)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThan" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not LessThan value
          if (col.value < value) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }

        if (validValue.value == "LessThanOrEqual" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value <= Number(value)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThanOrEqual" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value <= value) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "notEqual" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value != Number(value)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "not Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "notEqual" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value != value) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "not Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "BetweenExclusive" && col.columnDataType != "Date") {
          let col1: columns = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn1));
          let col2: columns = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn2));
          if ((col1.value < col.value) && (col.value < col2.value)) {
            col.validation.valid = true;
            col.validation.type = "BetweenExclusive";

            col.validation.columnOrStaticValue1 = col1.columnId;
            col.validation.columnOrStaticValue2 = col2.columnId;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = col1.columnId;
            col.validation.columnOrStaticValue2 = col2.columnId;
          }
        }
        if (validValue.value == "BetweenExclusive" && col.columnDataType == "Date") {
          let col1: columns = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn1));
          let col2: columns = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn2));
          if ((col1.value < col.value) && (col.value < col2.value)) {
            col.validation.valid = true;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = col1.columnId;
            col.validation.columnOrStaticValue2 = col2.columnId;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = col1.columnId;
            col.validation.columnOrStaticValue2 = col2.columnId;
          }
        }
        if (validValue.value == "BetweenInclusive" && col.columnDataType != "Date") {
          let col1 = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn1));
          let col2 = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn2));
          if ((col1.value < col.value) && (col.value < col2.value)) {
            col.validation.valid = true;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = col1.columnId;
            col.validation.columnOrStaticValue2 = col2.columnId;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = col1.columnId;;
            col.validation.columnOrStaticValue2 = col2.columnId;
          }

        }
        if (validValue.value == "BetweenInclusive" && col.columnDataType == "Date") {
          let col1 = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn1));
          let col2 = this.GetColumnOfComparedColumnBycKey(Number(validValue.validValueStaticOrColumn2));
          if ((col1.value < col.value) && (col.value < col2.value)) {
            col.validation.valid = true;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          }

        }
      } else if (validValue.type == "staticValue") {
        if (validValue.value == "Equail" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not equil value
          if (Number(validValue.validValueStaticOrColumn) == col.value) {
            col.validation.valid = true;

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Equail";

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        } if (validValue.value == "Equail" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not equil value
          if (validValue.validValueStaticOrColumn == col.value) {
            col.validation.valid = true;

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Equail";

            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThan" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not greaterThan value
          if (col.value > Number(validValue.validValueStaticOrColumn)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThan" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not greaterThan value
          if (col.value > validValue.validValueStaticOrColumn) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThanOrEqual" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not greaterThanOrEqual value
          if (col.value >= Number(validValue.validValueStaticOrColumn)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "greaterThanOrEqual" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not greaterThanOrEqual value
          if (col.value >= validValue.validValueStaticOrColumn) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "greater Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThan" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not LessThan value
          if (col.value < Number(validValue.validValueStaticOrColumn)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThan" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not LessThan value
          if (col.value < validValue.validValueStaticOrColumn) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThanOrEqual" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value <= Number(validValue.validValueStaticOrColumn)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "LessThanOrEqual" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value <= validValue.validValueStaticOrColumn) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "Less Than Or Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "notEqual" && col.columnDataType != "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value != Number(validValue.validValueStaticOrColumn)) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "not Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "notEqual" && col.columnDataType == "Date") {
          // validValueStaticOrColumn not LessThanOrEqual value
          if (col.value != validValue.validValueStaticOrColumn) {
            col.validation.valid = true;
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: false };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          } else {
            col.validation.valid = false;

            col.validation.columnOrStaticValue = validValue.validValueStaticOrColumn;
            col.validation.type = "not Equal";
            this.FormFlagDisabledValidationValue = this.FormFlagDisabledValidationValue.filter(x => x.key != col.ckey);
            let disabledFlag = { key: col.ckey, value: true };
            this.FormFlagDisabledValidationValue.push(disabledFlag);
          }
        }
        if (validValue.value == "BetweenExclusive" && col.columnDataType != "Date") {

          let n1 = parseInt(validValue.validValueStaticOrColumn1);
          let n2 = parseInt(validValue.validValueStaticOrColumn2)
          if ((n1 < col.value) && (col.value < n2)) {
            col.validation.valid = true;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          }
        }

        if (validValue.value == "BetweenExclusive" && col.columnDataType == "Date") {
          // between Exclusive Date
          if ((validValue.validValueStaticOrColumn1 < col.value) && (col.value < validValue.validValueStaticOrColumn2)) {
            col.validation.valid = true;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenExclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          }
        }
        if (validValue.value == "BetweenInclusive" && col.columnDataType != "Date") {
          let n1 = parseInt(validValue.validValueStaticOrColumn1);
          let n2 = parseInt(validValue.validValueStaticOrColumn2)
          if ((n1 <= col.value) && (col.value <= n2)) {
            col.validation.valid = true;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          }
        }
        if (validValue.value == "BetweenInclusive" && col.columnDataType == "Date") {
          if ((validValue.validValueStaticOrColumn1 <= col.value) && (col.value <= validValue.validValueStaticOrColumn2)) {
            col.validation.valid = true;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          } else {
            col.validation.valid = false;
            col.validation.type = "BetweenInclusive";
            col.validation.columnOrStaticValue1 = validValue.validValueStaticOrColumn1;
            col.validation.columnOrStaticValue2 = validValue.validValueStaticOrColumn2;
          }
        }

      }
      let disabledOne = this.FormFlagDisabledValidationValue.find(x => x.value == true);
      if (disabledOne != null) {
        this.FlagDisabledValidation = true;
      } else {
        this.FlagDisabledValidation = false;
      }
    }

  }


}

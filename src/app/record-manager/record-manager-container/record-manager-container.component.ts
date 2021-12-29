import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecordManagerRequest } from 'src/app/models/requests/RecordManagerRequest';
import { SecRoleDef } from 'src/app/models/SecRoleDef';
import { columns, FormateValue, Validation } from 'src/models/dataSheetModels/columns';
import { Rows } from 'src/models/dataSheetModels/Rows';
import { section } from 'src/models/dataSheetModels/section';
import { ColumnData } from 'src/models/requests/columnDataRequest';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';
import { DataSheetService } from 'src/services/DataSheetService';
import { RelationRecordService } from 'src/services/RelationRecordService';
import { TableService } from 'src/services/TableService';

@Component({
  selector: 'app-record-manager-container',
  templateUrl: './record-manager-container.component.html',
  styleUrls: ['./record-manager-container.component.scss'],
  providers:[DataSheetService,TableService,RelationRecordService]
})
export class RecordManagerContainerComponent implements OnInit,OnChanges {
  dataSheets:SysDatasheetVm[];
  @Input() Rkey: number;
  sections: section[];
  selectedId: any = 0;
  ShowSection: section;
  rows: Rows[];
  DbColumns: ColumnData[];
  FormFlagDisabledRequired: any[];
  FlagDisabledRequired: boolean = false;
  FormFlagDisabledValidationValue: any[];
  FlagDisabledValidation: boolean = false;
  FormFlagDisabledRegexValue: any[];
  FlagDisabledRegex: boolean = false;
  selectedDataSheet:any;
  recordData:any;
  DataPermission:SecRoleDef;
  recordManagerRequest:RecordManagerRequest;
  constructor(private _dataSheetService:DataSheetService,
    private _tableService:TableService,
    private _RelationRecordService:RelationRecordService) { 
    this.sections = new Array<section>();
    this.ShowSection = new section();
    this.rows = new Array;
    this.DbColumns=new Array;
    this.FormFlagDisabledRequired=new Array;
    this.FormFlagDisabledValidationValue = new Array;
    this.FormFlagDisabledRegexValue = new Array;
    this.dataSheets=new Array;
    this.DataPermission=new SecRoleDef();
    this.recordManagerRequest=new RecordManagerRequest();
  }
 
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.recordManagerRequest.Rkey=this.Rkey;
   this.GetDataSheetByRkey(this.recordManagerRequest);
   this.RecordManager(this.Rkey);
   this.GetDataPermissionByRkey(this.Rkey);
  }

  GetDataSheetByRkey(recordManagerRequest){
    
    this._dataSheetService.GetDataSheetsByRkey(recordManagerRequest).subscribe((res:any)=>{
      if(res.success){
        debugger;
        this.dataSheets = res.model;
        this.selectedDataSheet=this.dataSheets[0].dskey;
        this.ChangeDataSheet();
      }
    });
  }



  selectSection(id: any) {
    
    this.selectedId = id;
    this.ShowSection = this.sections.find(x => x.id == this.selectedId);
    this.rows = this.ShowSection.rows;
    console.log("rows",this.rows);

  }


  GetAllColumns(Rkey:any){
    this._tableService.GetAllColumnsByRkey(Rkey).subscribe((res:any)=>{

      this.DbColumns= res.model.data;
      this.sections.forEach(element => {
        //set validValue
        this.setBehaviorOnLoad(element.rows);
      });
    })
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
    this.sections.forEach((item: any) => {
      item.rows.forEach(col => {
        let comparedColumn = col.cols.find(x => x.ckey == ckey);
        if (comparedColumn != null) {
          value = col.cols.find(x => x.ckey == ckey);
        }

      });
    })

    return value;
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

      ChangeDataSheet(){
        this.FlagDisabledRequired=false;
        this.FlagDisabledRegex=false;
        this.FlagDisabledValidation=false;
        this.FormFlagDisabledRequired=new Array;
        this.FormFlagDisabledValidationValue=new Array;
        this.FormFlagDisabledRegexValue=new Array;
        let res:any=this.dataSheets.find(x=>x.dskey == this.selectedDataSheet);
        this.sections = JSON.parse(res.jsonContent);
       
        this.GetAllColumns(this.Rkey);
        if(this.sections.length >0)
        this.selectSection(this.sections[0].id);
      }

      RecordManager(Rkey:any){
        this._RelationRecordService.RecordManagerTree(Rkey)
        .subscribe((res:any)=>{
          this.recordData=res.model;
        })
      }

      GetDataPermissionByRkey(Rkey:any){
        this._RelationRecordService.GetDataPermissionByRkey(Rkey)
        .subscribe((res:any)=>{
         this.DataPermission= res.model;
        })
      }
      saveTab(){

      }
}


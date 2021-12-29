export class columns{
    public ckey?:any;
    public columnId?: string;
    public columnCaption?: string;
    public columnDataType?: string;
    public isSystemCoulmn?: boolean;
    public isActive?: boolean;
    public isIdField?: boolean;
    public keepHistory?: boolean;
    public size?: number;
    public uomKey?: number;
    public value?: any;
    public jsonBehavior?:any;
    public ValidValue?:any;
    public typeOfValidValue?:any;
    public maskedField?:any;
    public DefaultValue?:any;
    public disabled?:any=false;
    public HideFalid?:any=false;
    public requiredFlag?:any=false;
    public validation?:Validation;
    public formateValue?:FormateValue;
    constructor() {
        this.validation=new Validation();
        this.formateValue=new FormateValue();
        
    }
}
export class Validation{
    public valid?:any;
    public columnOrStaticValue?:any;
    public columnOrStaticValue1?:any;
    public columnOrStaticValue2?:any;
    public type?:any;
    
}

export class FormateValue{
    public valid?:any = true;
    public type?:any;
}
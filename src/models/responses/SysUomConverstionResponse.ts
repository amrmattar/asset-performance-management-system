import { LongPressDirective } from "@swimlane/ngx-datatable";

export class SysUomeConverstionResponse {
    constructor(
        public  toUomId?:string,
        public  fromUomId?:string,
        public  uomkey?:number,
        public  fromUomkey?:number,
        public  toUomkey? :number,
        public  converstionFormula ?:string
    ){}
}
import { SysUomeConverstionResponse } from "./SysUomConverstionResponse";
import { UOMUnitesResponse } from "./UomUnitesResponse";

export class UOMCategoriesResponse {
    constructor(
        public uomeDesc?:string,
        public uomeCateg?:string,
        public sysUnitsOfMeasure? :UOMUnitesResponse[],
        public OldUomeCateg?:string,

    )
    {  }
}

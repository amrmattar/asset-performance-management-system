import { SysUomeConverstionResponse } from "./SysUomConverstionResponse";

export class UOMUnitesResponse {
    constructor(
        public uomkey? :number,
        public uomeId?:string,
        public uomeCaption?:string,
        public uomeSysFlg?:string,
        public umcsId?:string,
        public sysUomeConverstions?:SysUomeConverstionResponse[],

    )
    {  }
}

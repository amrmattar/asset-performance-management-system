import { Guid } from 'guid-typescript';

export class SysCatalog{
    constructor(
      public catkey?: number,
      public caption?: string,
      public parentCatKey?: number,
      public IsProductCat?: boolean,
      public createdBy?: number,
      public createdDate?: Date,
      public modifiedBy?: number,
      public modifiedDate?: Date,
      public shortDesc?: string,
      public uid?: Guid,
      public ownerUKey?:number,
      public catalogs?:SysCatalog[],
      public icon?:string,
      public isSelected?:boolean ,
      public expanded?:boolean,
    
      public modifiedByName?: string
               ) { }
  }
  
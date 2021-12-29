import { Guid } from 'guid-typescript';

export class CatalogItems{
    constructor(
      public ikey?: number,
      public catKey?: number,
      public itype?: number,
      public caption?: string,
      public content?: string,
      public createdBy?: number,
      public createdDate?: Date,
      public modifiedBy?: number,
      public modifiedDate?: Date,
      public shortDesc?: string,
      public uid?: Guid,

               ) { }
  }
  
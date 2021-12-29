import { Guid } from "guid-typescript";


export class RelationDataResponse{
    
    public DefKey :  number;
    public Uid : Guid;
    public TableKey:  number; 
    public PredecessorKey:  number;  
    public SuccessorKey :  number;  
    public RelationshipType : boolean;  
    public OrganizationKey:  number;  
    public CreatedBy :  number;  
    public CreatedDate : Date;
    public ModifiedBy :  number; 
    public ModifiedDate : Date;  
}
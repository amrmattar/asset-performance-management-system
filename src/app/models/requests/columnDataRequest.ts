

export class ColumnData {

  public ckey?: number;
  public tkey?: number;
  public columnId?: string;
  public columnCaption?: string;
  public columnDataType?: string;
  public isSystemCoulmn?: boolean;
  public isActive?: boolean;
  public isIdField?: boolean;
  public keepHistory?: boolean;
  public size?: number;
  public uomKey?: number;
}
export enum DataTypeEnum {
  Binary = 1,
  Numeric = 2,
  Date = 3,
  Character = 4,
  Text = 5,
  Logical = 6

}
export const DataTypeMapping = [
  { value: DataTypeEnum.Binary, type: 'Binary' },
  { value: DataTypeEnum.Numeric, type: 'Numeric' },
  { value: DataTypeEnum.Date, type: 'Date' },
  { value: DataTypeEnum.Character, type: 'Character' },
  { value: DataTypeEnum.Text, type: 'Text' },
  { value: DataTypeEnum.Logical, type: 'Logical' }
];

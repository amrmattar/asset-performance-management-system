"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColumnData {
    constructor(ckey, tkey, columnId, columnCaption, columnDataType, isSystemCoulmn, isActive, isIdField, keepHistory, size, uomKey) {
        this.ckey = ckey;
        this.tkey = tkey;
        this.columnId = columnId;
        this.columnCaption = columnCaption;
        this.columnDataType = columnDataType;
        this.isSystemCoulmn = isSystemCoulmn;
        this.isActive = isActive;
        this.isIdField = isIdField;
        this.keepHistory = keepHistory;
        this.size = size;
        this.uomKey = uomKey;
    }
}
exports.ColumnData = ColumnData;
var DataTypeEnum;
(function (DataTypeEnum) {
    DataTypeEnum[DataTypeEnum["Binary"] = 1] = "Binary";
    DataTypeEnum[DataTypeEnum["Numeric"] = 2] = "Numeric";
    DataTypeEnum[DataTypeEnum["Date"] = 3] = "Date";
    DataTypeEnum[DataTypeEnum["Character"] = 4] = "Character";
    DataTypeEnum[DataTypeEnum["Text"] = 5] = "Text";
    DataTypeEnum[DataTypeEnum["Logical"] = 6] = "Logical";
})(DataTypeEnum = exports.DataTypeEnum || (exports.DataTypeEnum = {}));
exports.DataTypeMapping = [
    { value: DataTypeEnum.Binary, type: 'Binary' },
    { value: DataTypeEnum.Numeric, type: 'Numeric' },
    { value: DataTypeEnum.Date, type: 'Date' },
    { value: DataTypeEnum.Character, type: 'Character' },
    { value: DataTypeEnum.Text, type: 'Text' },
    { value: DataTypeEnum.Logical, type: 'Logical' }
];
//# sourceMappingURL=columnDataRequest.js.map
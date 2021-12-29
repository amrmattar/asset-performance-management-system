export enum NotificationType {
    success = "success",
    error = "error",
    info = "info",
    warning = "warning"
}
export enum DocumentType {
    Image = 1,
    Video,
    Audio,
    Pdf,
    Other
}

export enum AcceptedFiles {
    Image = "image/*",
    Video = "video/*",
    Audio = "audio/*"
}

export enum ActionType {
    Details = 1,
    Edit = 2,
    Delete = 3,
    Export_CSV = 4,
    Export_Excel = 5,
    Export_PDF = 6,
    Convert = 7,
    Following = 8,
    Download = 9,
    Share = 10,
    Comments = 11,
    Restore = 12
}

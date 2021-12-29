import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService , RichTextEditorComponent, NodeSelection} from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
@Component({
  selector: 'app-querycomposer-sql',
  templateUrl: './querycomposer-sql.component.html',
  styleUrls: ['./querycomposer-sql.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class QuerycomposerSqlComponent  {
    public tools: object = {
        items: ['Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'SubScript', 'SuperScript', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', '|',
            'OrderedList', 'UnorderedList', '|',
            'Indent', 'Outdent', '|',
            'CreateLink','Image', '|',
            'ClearFormat', 'Print', 'SourceCode', '|',
            'FullScreen']
    };
    public iframe: object = { enable: true,OrderedList:true };
    public height: any = "100%" ;
}  


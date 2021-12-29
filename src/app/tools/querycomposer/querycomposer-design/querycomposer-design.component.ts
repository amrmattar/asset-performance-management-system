import { Component, ViewEncapsulation, ViewChild ,OnInit, ElementRef} from '@angular/core';
import { Diagram, DiagramComponent, NodeModel, ConnectorModel, HtmlModel, BasicShapeModel, DiagramTools, TextModel, ICollectionChangeEventArgs, IConnectionChangeEventArgs, IHistoryChangeArgs, IEndChangeEventArgs, ISelectionChangeEventArgs, IMouseEventArgs } from '@syncfusion/ej2-angular-diagrams';
import { NodeConstraints, LineRouting, DiagramConstraints, ConnectorConstraints, SnapConstraints, SnapSettingsModel ,ZoomOptions} from '@syncfusion/ej2-diagrams';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { CrudService } from './crud.service';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { L10n } from '@syncfusion/ej2-base';
import { BeforeOpenCloseMenuEventArgs, DropDownButtonComponent, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
Diagram.Inject(LineRouting);
@Component({
  selector: 'app-querycomposer-design',
  templateUrl: './querycomposer-design.component.html',
  styleUrls: ['./querycomposer-design.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuerycomposerDesignComponent implements OnInit{
  creteriaList:any;
  manual:any="Manual";
  btnContentGate:string="Gate";
  btnContentOperator:string="Operator";
  btnContentInput:string="Input";
  columns: string[];
  sourceId: any;
  isChecked:any;
  isChecked1:any;
  isChecked2:any;
  showuom:boolean=false;
  showtotal:boolean=false;
  showpivot:boolean=false;
  targetId: any;
  fromId:any;
  toid:any;
  name:any;
  creteriaState:boolean=false;
  flag: boolean = false;
  columnFromId:any="column1";
  columnToId:any="column1";
  public offsetX: number = 100;
  public offsetY: number = 100;
  nodeId: any;
  newNode: any;
  event: any;
  leaveNodeId: string;
  nodesdemo:any[];
  captionToEntity:any;
  rightHeader: string ='';
  ItemsArray:any= [];
   HEROES:any = [
    {id: 1, name:'bleed'},
    {id: 2, name:'field'},
    {id: 5, name:'custome'},
    {id: 3, name:'what'},
    {id: 4, name:'Routin'},

];
  fromNode: NodeModel;
  connectorsDemo: ConnectorModel[];
  public headerText: Object = [{ text: 'Related Tables' }, { text: 'All Tables' }, { text: 'Query' }];
  @ViewChild('dropdownbutton')
  public dropdownbutton: DropDownButtonComponent;
  // Initialize action items.
  public Gate: ItemModel[] = [
   {
       text: 'AND'
   },
   {
       text: 'OR'
   },
   {
       text: 'NOR'
   }];
   public Operator: ItemModel[] = [
   {
       text: 'Greater Than'
   },
   {
       text: 'Less Than'
   },
   {
       text: 'Equals'
   },
   {
       text: 'Contains'
   },
   {
       text: 'Does not Contain'
   },
   {
       text: 'Is Null'
   },
   {
       text: 'Is not Null'
   },
   {
       text: 'Before'
   },
   {
       text: 'After'
   },
   {
       text: 'True'
   },
   {
       text: 'False'
   },
   {
       text: 'Starts with'
   },
   {
       text: 'Ends with'
   }];
    public Input: ItemModel[] = [
   {
       text: 'Manual'
   },
   {
       text: 'Select a Source'
   }];
public data: string[] = ['Field 1', 'Field 2', 'Field 3', 'Field 4', 'Field 5'];
    public data2: string[] = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];
  modEntAllTable: boolean=false;
  modEntsavequery:boolean=false;
  nodeDeleteArray: any=[];
  pushidcount: any=0;
  predecessor: string;
  predecessorField: string;
  successor: string;
  successorField: string;
  constructor(private crudService: CrudService) { 
    this.nodesdemo=this.nodes.map(x=>x);
    this.creteriaList=new Array;
    // this.fillTable();
  }

  @ViewChild('diagram')
  public diagram: DiagramComponent;
  public drawingshape: BasicShapeModel;
  public node: NodeModel;
  public connectors: ConnectorModel;
  public constraints: DiagramConstraints = DiagramConstraints.Default | DiagramConstraints.LineRouting;

  public connectorss: ConnectorModel[] = [
    {
      id: 'connector', sourceID: 'n1', targetID: 'n2', type: 'Bezier',
      style: { strokeColor: '#1671e2', strokeWidth: 2, fill: "white" },
      targetDecorator: { style: { strokeColor: '#1671e2', fill: '#1671e2' } }
    },
    { id: 'connector2', sourceID: 'n1', targetID: 'n3', type: 'Bezier',
    style: { strokeColor: '#1671e2', strokeWidth: 2, fill: "white" },
    targetDecorator: { style: { strokeColor: '#1671e2', fill: '#1671e2' } } }
  ];


  public nodes: NodeModel[] = [
    {
      id: 'n1', width: 130, height: 65, offsetX: 200, offsetY: 200, shape: { type: 'HTML' },
      annotations: [{ content: ' ali' }],constraints: NodeConstraints.Default &~( NodeConstraints.Resize + NodeConstraints.Rotate)
    },
    {
      id: 'n2', width: 130, height: 65, offsetX: 600, offsetY: 200, shape: { type: 'HTML' },
      annotations: [{ content: ' mahmoud'},],constraints: NodeConstraints.Default &~( NodeConstraints.Resize + NodeConstraints.Rotate)
    },
    {
      id: 'n3', width: 130, height: 65, offsetX: 300, offsetY: 400, shape: { type: 'HTML' },
      annotations: [{ content: ' amr' },],constraints: NodeConstraints.Default &~( NodeConstraints.Resize + NodeConstraints.Rotate)
    }
  ]



  deleteNode(e) {
    this.nodeId = e.path[3].id.split("_")[0];
    this.nodeDeleteArray.push(this.nodeId); 
    console.log(this.nodeId)
  for (let k: number = 0; k <= this.nodeDeleteArray.length; k++) {
    for (let i: number = 0; i < this.diagram.connectors.length; i++) {
      let connector: ConnectorModel = this.diagram.connectors[i];
      if (connector.sourceID == this.nodeDeleteArray[k]) {
        this.nodeDeleteArray.push(connector.targetID); 
      }
    }
  }
    console.log(this.nodeDeleteArray)
  for (let j: number = 0; j <= this.nodeDeleteArray.length; j++) {
    for (let i: number = 0; i < this.diagram.nodes.length; i++) {
      let node: NodeModel = this.diagram.nodes[i];
      if (node.id == this.nodeDeleteArray[j]) {
        this.diagram.remove(node);
        --i;
      }}}
    this.nodesdemo = this.nodesdemo.filter(x => x.id != this.nodeId);
    // console.log("this.nodesdemo", this.nodes);
  }


  public mouseLeave(args: IMouseEventArgs): void {
    // console.log("mouseLeave", args.element.wrapper.id);
    this.targetId = args.element.wrapper.id;
    this.leaveNodeId = args.element.wrapper.id;
    this.default(this.event);
    // if (this.sourceId != null && this.targetId != null) {
    //   this.lockConnectors();
    // }
  }

  public sourcePointChange(args: IEndChangeEventArgs): void {
    if (args.state === 'Completed') {
      // console.log("source Point Change", args.targetNode);
    }
  }

  public targetPointChange(args: IEndChangeEventArgs): void {
    // console.log("target Point Change", args.targetNode);
  }


  public created(e): void {
    this.sourceId = e.path[3].id.split("_")[0];
    this.event = e;
    this.connectors = { id: 'connector1', type: 'Bezier' ,
    style: { strokeColor: '#1671e2', strokeWidth: 2, fill: "white" },
    targetDecorator: { style: { strokeColor: '#1671e2', fill: '#1671e2' } }};
    this.diagram.drawingObject = this.connectors;
    //To draw an object once, activate draw once
    this.diagram.tool = DiagramTools.DrawOnce;
    // console.log(this.connectors)
    this.diagram.dataBind();
  }

  public default(e): void {
    this.connectors = { id: 'connector1', type: 'Bezier' };
    this.diagram.drawingObject = this.connectors;
    //To draw an object once, activate draw once
    this.diagram.tool = DiagramTools.Default;
    // console.log(this.connectors)
    this.diagram.dataBind();
  }

  public addNode() {
    let counter = this.nodes.length;
    counter = ++counter;
    let id = "n" + counter;
    //Create a node object with size
    let node: NodeModel = { id: id, width: 130, height: 65, offsetX: 200, offsetY: 400, style: { fill: "grey" }, shape: { type: 'HTML' }, annotations: [{ content: ' new node' }] ,constraints: NodeConstraints.Default &~( NodeConstraints.Resize + NodeConstraints.Rotate)}
    //check node offset lesser than diagram viewportwidth
    let offsetX: number = this.diagram.scrollSettings.viewPortWidth / 2;
    if (this.offsetX < this.diagram.scrollSettings.viewPortWidth) {
      node.offsetX = offsetX;
      node.offsetY = this.offsetY;
      //add a node at runtime
      this.diagram.add(node);
      this.offsetY = this.offsetY + 20;
    }
    this.nodes.push(node);
    this.nodesdemo.push(node);
    console.log("this.nodesdemo", this.nodesdemo);
    this.ejDialog1.hide();
    this.ejDialog2.hide();
    this.ejDialog3.hide();
    this.ejDialog4.hide();
  }


  public addDestinationNode() {
    console.log("this.fromId", this.fromId);
    let counter = this.nodes.length;
    counter = ++counter;
    let id = "n" + counter;
    this.toid=id;
    //Create a node object with size
    let node: NodeModel = { id: id, width: 130, height: 65, offsetX: 200, offsetY: 400, style: { fill: "grey" }, shape: { type: 'HTML' }, annotations: [{ content: this.captionToEntity }],constraints: NodeConstraints.Default &~( NodeConstraints.Resize + NodeConstraints.Rotate) }
    let connector: ConnectorModel = {
       sourceID: this.fromId, targetID: id, type: 'Bezier',
      style: { strokeColor: '#1671e2', strokeWidth: 2, fill: "white" },
      targetDecorator: { style: { strokeColor: '#1671e2', fill: '#1671e2' } }
    }
    //check node offset lesser than diagram viewportwidth
    let offsetX: number = this.diagram.scrollSettings.viewPortWidth / 2;
    if (this.offsetX < this.diagram.scrollSettings.viewPortWidth) {
      node.offsetX = offsetX;
      node.offsetY = this.offsetY;
      //add a node at runtime
      this.diagram.add(node);
      this.diagram.add(connector);
      this.offsetY = this.offsetY + 40;
    }
    this.nodes.push(node);
    this.nodesdemo.push(node);
    // console.log("this.nodesdemo", this.nodesdemo);
    this.ejDialog1.hide();
    this.ejDialog2.hide();
    this.ejDialog3.hide();
    this.ejDialog4.hide();
  }



  lockConnectors() {
    for (let i: number = 0; i < this.diagram.connectors.length; i++) {
      let connector: ConnectorModel = this.diagram.connectors[i];
      // connector.constraints = ConnectorConstraints.Select & ~ConnectorConstraints.None;
      connector.constraints = ConnectorConstraints.PointerEvents;
      this.diagram.dataBind();
    }
  }

  public unlinked() {
    for (let i: number = 0; i < this.diagram.connectors.length; i++) {
      let connector: ConnectorModel = this.diagram.connectors[i];
      if (connector.sourceID == '' || connector.targetID == ''  ) {
        this.diagram.remove(connector);
        i--;
      }
    }
  }


  public selectionChange(args: ISelectionChangeEventArgs): void {

    //  console.log("args", args.newValue[0]);
     if(args.newValue[0] != undefined){
    if(args.newValue[0].shape.type == "None"){
      this.lockConnectors();
      this.onOpenDialog4(args);
      // console.log("args", "kjghlhil");
    }
  }
    setTimeout(() => {
      this.unlinked();
    }, 50);
    if(args.type != "Removal"){
      if(args.newValue[0] != undefined){
      if(args.newValue[0].annotations.length > 0){
    this.rightHeader = args.newValue[0].annotations[0].content.split(",")[0];
  }
}
  }
  }


  public onItemClick(args: ClickEventArgs): void {
    switch (args.item.text) {
        case 'Zoom In':
            let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
            this.diagram.zoomTo(zoomin);
            this.diagram.dataBind();
            break;
        case 'Zoom Out':
            let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
            this.diagram.zoomTo(zoomout);
            this.diagram.dataBind();
            break;
    }
}


@ViewChild('ejDialog1') ejDialog1: DialogComponent;
@ViewChild('ejDialog2') ejDialog2: DialogComponent;
@ViewChild('ejDialog3') ejDialog3: DialogComponent;
@ViewChild('ejDialog4') ejDialog4: DialogComponent;
@ViewChild('element') tabObj: TabComponent;
@ViewChild('element1') tabObj1: TabComponent;
// Create element reference for dialog target element.
@ViewChild('container', { read: ElementRef }) container: ElementRef;

public targetElement: HTMLElement;
public hidden: Boolean = false;
//To get all element of the dialog component after component get initialized.
ngOnInit() {
  let creteria={};
  this.creteriaList.push(creteria);
  L10n.load({
    'de': {
    'numerictextbox': {
            incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert'
        }
   }
});
  // this.initilaizeTarget();
}

public hideDialog: EmitType<object> = () => {
    this.ejDialog1.hide();
    this.ejDialog2.hide();
    this.ejDialog3.hide();
    this.ejDialog4.hide();
}

// Sample level code to handle the button click action
public onOpenDialog1 = function (event: any): void {
    // Call the show method to open the Dialog
    this.modEntAllTable = false;
    this.tabObj.selectedItem = 0;
    this.ejDialog1.show();
}
public onOpenDialog2 = function (event: any): void {
    // Call the show method to open the Dialog
    this.tabObj1.selectedItem = 0;
    this.fromId= event.path[3].id.split("_")[0];
    console.log("this.fromId", this.fromId);
    this.ejDialog2.show();
}
public onOpenDialog3 = function (event: any): void {
  // Call the show method to open the Dialog
  console.log(event.name)
  if(event.name != undefined){
    this.modEntsavequery = true;
    this.modEntAllTable = false;
  }
  this.ejDialog3.show();
}
public onOpenDialog4 (args) {
  console.log(args.newValue[0].sourceID)
  console.log(args.newValue[0].targetID)
  for (let i: number = 0; i < this.diagram.nodes.length; i++) {
    let node: NodeModel = this.diagram.nodes[i];
    // console.log(node)
    if (args.newValue[0].sourceID == node.id) {
      // console.log(node.annotations[0].content.split(",")[0])
      this.predecessor = node.annotations[0].content.split(",")[0];
      // console.log(node.annotations[0].content.split(",")[1])
      this.predecessorField = node.annotations[0].content.split(",")[1];
    }
    if (args.newValue[0].targetID == node.id) {
      // console.log(node.annotations[0].content.split(",")[0])
      this.successor = node.annotations[0].content.split(",")[0];
      // console.log(node.annotations[0].content.split(",")[1])
      this.successorField = node.annotations[0].content.split(",")[1];
    }
  }
  // Call the show method to open the Dialog
  this.ejDialog4.show();
}

public onOverlayClick: EmitType<object> = () => {
  this.ejDialog1.hide();
  this.ejDialog2.hide();
  this.ejDialog3.hide();
  this.ejDialog4.hide();
  }

  public btnclick1 (){
  //  console.log("this.fromId",this.fromId) ;
  this.fromNode= this.nodes.find(x=>x.id == this.fromId);
  this.fromNode.annotations[0].content= this.fromNode.annotations[0].content+","+this.columnToId
   this.captionToEntity=this.captionToEntity+","+this.columnFromId;
    this.addDestinationNode();
    // console.log("this.toid",this.toid) ;
    this.connectorsDemo = this.diagram.connectors.map(x=>x);
    setTimeout(() => {
      this.nodes=this.diagram.nodes.filter(x=>x.id != this.fromId);
    this.nodes.push(this.fromNode)
    this.connectorss= this.connectorsDemo.map(x=>x);
    }, 50);
}

  public btnclick2() {
    this.ejDialog1.hide();
    this.ejDialog2.hide();
    this.ejDialog3.hide();
    this.ejDialog4.hide();
}
setCaptionTableId(captionToEntity){
  this.captionToEntity=captionToEntity;
   this.btnclick1();
}
setCaptionTableId2(captionToEntity){
  this.captionToEntity=captionToEntity;
}

getTableId(annonation){
  return annonation.split(",")[0];
}
getcolumnId(annonation){
  return annonation.split(",")[1];
}

push(e){
  const app = document.getElementById("app");
  // console.log(e.path[0].innerHTML)
  this.pushidcount++;
  let item ={
    'id': this.pushidcount,
    'name':this.rightHeader,
    'email':e.path[0].innerHTML,
  }
  this.ItemsArray.push(item)
}
pop(e){
  console.log(e.path[0].id)
  for (let i = 0; i < this.ItemsArray.length; i++) {
    if(this.ItemsArray[i].id == e.path[0].id){
    console.log(this.ItemsArray)
    this.ItemsArray.splice(i, 1)
    console.log(this.ItemsArray)
    i--;
  }
  }
}


onTabChange(args: any){
  // You can add your code Here
  console.log(args.selectingIndex)
  if(args.selectingIndex != 0){
    this.modEntAllTable = true;
  }
 else {
  this.modEntAllTable = false;
}
}
onTabChangeintial(args: any){
  // You can add your code Here
  // console.log(args.selectingIndex)
  if(args.selectingIndex == 2){
    // this.modEntAllTable = true;
    this.onOpenDialog3(args)
  }
}
onTabSelectintial(args: any){
  // console.log(args.path[0].innerHTML)
  console.log(args.path[0].innerHTML)
  // You can add your code Here
  if(args.path[0].innerHTML == "Query"){
    // this.modEntAllTable = true;
    this.onOpenDialog3(args)
  } else if (args.path[0].innerHTML == '<div class="e-text-wrap"><div class="e-tab-text" role="presentation">Query</div><span class="e-icons e-close-icon" title="Close"></span></div>'){
    this.onOpenDialog3(args)
  }else if (args.path[0].innerHTML == '<div class="e-tab-text" role="presentation">Query</div><span class="e-icons e-close-icon" title="Close"></span>'){
    this.onOpenDialog3(args)
  }
}
public validation (event: any): void {
  this.modEntsavequery = false;
  this.ejDialog1.hide();
  this.ejDialog2.hide();
}



// private fillTable() {
//   this.columns = [];
//   for (let i = 0; i < 10; i++) {
//     const columnLabel = 'Column_' + (i + 1);
//     this.columns.push(columnLabel);
//   }
// }

checkuom(event: any){
  console.log(event);
  if(event == 'uom'){
    this.showuom = true;
  } else {
    this.showuom = false;
  }
}
checktotal(event: any){
  console.log(event);
  if(event == 'total'){
    this.showtotal = true;
  } else {
    this.showtotal = false;
  }
}
checkpivot(event: any){
  console.log(event);
  if(event == 'pivot'){
    this.showpivot = true;
  } else {
    this.showpivot = false;
  }
}
activateCreteria(){
  this.creteriaState = !this.creteriaState;
}

public selectGate(args: MenuEventArgs) {
  this.btnContentGate = args.item.text;
} 
 public selectOperator(args: MenuEventArgs) {
  this.btnContentOperator = args.item.text;
} 
 public selectInput(args: MenuEventArgs) {
  this.btnContentInput = args.item.text;
  this.manual=args.item.text;
}
public fields: Object = { text: 'Game', value: 'Id' };
  // set the placeholder to DropDownList input element
  public waterMark: string = 'Select a game';
  // set the value to select an item based on mapped value at initial rendering
  public value: string = '1';
  addcreteria(){
      let creteria={};
      this.creteriaList.push(creteria);
  }
  deleteCreteria(i){
      debugger
      this.creteriaList.splice(i, 1);
  }

}

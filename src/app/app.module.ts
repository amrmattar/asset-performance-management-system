
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RlTagInputModule } from 'angular2-tags';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppInjector } from '../services/injectorservice';
import { LoggedInGuard } from '../utilities/loggedinguard ';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { UserService } from '../services/userservice';
import { TextBoxModule, NumericTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { UsersComponent } from './admin/securityManager/Users/users.component';
import { UsersSideBarComponent } from './admin/securityManager/sidebar/UsersSideBar.component';
import { Repository } from './data/repository';
import { UsersFormComponent } from './admin/securityManager/user-form/user.form.component';
import { RolesComponent } from './admin/securityManager/roles/roles';
import { SitesComponent } from './admin/securityManager/sites/sites';
import { UsersNavbarComponent } from './admin/securityManager/usersNavbar/users.navbar';
import { AddSiteComponent } from './admin/securityManager/addSite/add.site';
import { AddRoleComponent } from './admin/securityManager/addRole/add.role';
import { RolesRepository } from './data/roleRepository';
import { UploadComponent } from './admin/securityManager/upload/upload.component';
import { ConfirmDialogComponent } from './admin/securityManager/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './admin/securityManager/confirm-dialog/confirm-dialog.service';
import { NavGuard, DeactivateGuard } from '../utilities/navguard';
import { ConfigurationManagerComponent } from './admin/configurationManager/configuration.manager.component';
import { AccordionComponent } from './containers/ui/accordion/accordion.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfigurationManagerTopNavComponent } from './admin/configurationManager/configurationTopNav/conf.top.nav.component';
import { FieldsComponent } from './admin/configurationManager/Fields/fields.component';
import { FieldsInfoFormComponent } from './admin/configurationManager/FieldsInfo/fields.info.component';
import { FieldsTableComponent } from './admin/configurationManager/FieldsTable/fields.table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap';
import { DropzoneComponent } from './containers/forms/dropzone/dropzone.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RolesSidebarComponent } from './admin/securityManager/rolesSidebar/roles.sidebar';
import { SitesSidebarComponent } from './admin/securityManager/sitesSidebar/sites.sidebar';
import { RoleInfoComponent } from './admin/securityManager/roleInfo/role.info.component';
import { SitesTopNavComponent } from './admin/securityManager/sitesTopNav/sites.top.nav.component';
import { UserRolesComponent } from './admin/securityManager/userRoles/user.roles.component';
import { SiteUsersComponent } from './admin/securityManager/siteUsers/site.users.component';
import { UserSitesComponent } from './admin/securityManager/userSites/user.sites.component';
import { UsersTopNavComponent } from './admin/securityManager/usersTopNav/users.topnav.component';
import { ModalConfirmComponent } from './containers/ui/modals/modal-confirm/modal-confirm.component';
import { SiteInfoComponent } from './admin/securityManager/siteInfo/site.info.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddRoleRowComponent } from './admin/securityManager/addRoleRow/add.role.row.component';
import { AddSiteRowComponent } from './admin/securityManager/addSiteRow/add.site.row.component';
import { TreeviewModule } from 'ngx-treeview';
import { CatalogComponent } from './admin/catalog/catalog.component';
import { CatalogSidebarComponent } from './admin/catalog/catalog-sidebar/catalog.sidebar.component';
import { CatalogsRepository } from './data/catalogs.repository';

import { CatalogItemsTableComponent } from './admin/catalog/catalog-items/catalog.items.table.component';
import { TableModule } from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataSheetComponent } from './admin/configurationManager/data-sheet/data-sheet.component';
import { EditSectionDataSheetComponent } from './admin/configurationManager/edit-section-data-sheet/edit-section-data-sheet.component';
import { TableLayoutDataSheetComponent } from './admin/configurationManager/table-layout-data-sheet/table-layout-data-sheet.component';
import { PanelModule } from 'primeng/panel';
import { InfoDataSheetComponent } from './admin/configurationManager/info-data-sheet/info-data-sheet.component';
import { InformationFormComponent } from './admin/configurationManager/informationForm/information.form.component';
import { SecurityManagerComponent } from './admin/securitymanager/securitymanager.component';
import { TableDataSheetComponent } from './admin/configurationManager/table-data-sheet/table-data-sheet.component';
import { NOAccessComponent } from './user/noaccess/noaccess.component';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';
import { BootstrapModule } from './components/bootstrap/bootstrap.module';
import { DragDropModule } from 'primeng/dragdrop';
import { TablesSidebarComponent } from './admin/configurationManager/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainTapsComponent } from './main-taps/main-taps.component';
import { LoginComponent } from './user/login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { Sidebar2Component } from './shared/sidebar2/sidebar2.component';
import { CommonModule } from '@angular/common';
import { PasswordpolicyComponent } from './admin/securitymanager/passwordpolicy/passwordpolicy.component';
import { DefaultsettingsComponent } from './admin/securitymanager/defaultsettings/defaultsettings.component';
import { OperationManagerComponent } from './admin/operation-manager/operation-manager.component';
import { ConfigurationmanagersComponent } from './admin/configurationmanagers/configurationmanagers.component';
import { RelationshipService } from 'src/services/RelationshipService';
import { TestComponent } from './test/test.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ToastrModule } from 'ngx-toastr';
import { RelationShipsComponent } from './admin/configurationManager/relation-ships/relation-ships.component';
import { RelationInfoComponent } from './admin/configurationManager/relation-ships/relation-info/relation-info.component';
import { RelationNavComponent } from './admin/configurationManager/relation-ships/relation-nav/relation-nav.component';
import { RelationDefComponent } from './admin/configurationManager/relation-ships/relation-def/relation-def.component';
import { RecordManagerComponent } from './record-manager/record-manager.component';
import {TreeNode} from 'primeng/api';

import { RecordManagerSideBarComponent } from './record-manager/record-manager-side-bar/record-manager-side-bar.component';
import { RecordManagerContainerComponent } from './record-manager/record-manager-container/record-manager-container.component';
import { RelationShipsTableComponent } from './admin/configurationManager/relation-ships/relation-ships-table/relation-ships-table.component';
import { DatapermessionsComponent } from './admin/securityManager/datapermessions/datapermessions.component';
import { SideBarPermissionComponent } from './admin/securityManager/datapermessions/side-bar-permission/side-bar-permission.component';
import { MainContentDatapermissionComponent } from './admin/securityManager/datapermessions/main-content-datapermission/main-content-datapermission.component';
import { DataloadersComponent } from './tools/dataloaders/dataloaders.component';
import { DataloaderSidebarComponent } from './tools/dataloaders/dataloader-sidebar/dataloader-sidebar.component';
import { DataloaderInfotableComponent } from './tools/dataloaders/dataloader-infotable/dataloader-infotable.component';  
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';    
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';    
import { AuthGuard } from 'src/utilities/auth-guard';
import { MainPageComponent } from './MainPage/MainPage.component';

import { UOMService } from 'src/services/UOMService';
import { UOMComponent } from './admin/uom/uom.component';
import { UomSidebarComponent } from './admin/uom/uom-sidebar/uom-sidebar.component';
import { UomNavbarComponent } from './admin/uom/uom-navbar/uom-navbar.component';
import { UomMeasuringUnitsComponent } from './admin/uom/uom-measuring-units/uom-measuring-units.component';
import { UomMeasuringSystemsComponent } from './admin/uom/uom-measuring-systems/uom-measuring-systems.component';
import { ElasticSearchService } from 'src/services/ElasticSearchService';
import { QuerycomposerComponent } from './tools/querycomposer/querycomposer.component';
import { QuerycomposerNavbarComponent } from './tools/querycomposer/querycomposer-navbar/querycomposer-navbar.component';
import { QuerycomposerDesignComponent } from './tools/querycomposer/querycomposer-design/querycomposer-design.component';
import { QuerycomposerSqlComponent } from './tools/querycomposer/querycomposer-sql/querycomposer-sql.component';
import { QuerycomposerResultsComponent } from './tools/querycomposer/querycomposer-results/querycomposer-results.component';

import { RolesServeice } from 'src/services/RolesService';
import { RelationRecordService } from 'src/services/RelationRecordService';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { MeasuringSystemComponent } from './admin/measuring-system/measuring-system.component';
import { MeasuringSystemSideBarComponent } from './admin/measuring-system/measuring-system-side-bar/measuring-system-side-bar.component';
import { MeasuringMainContentComponent } from './admin/measuring-system/measuring-main-content/measuring-main-content.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { TreeViewModule as syncFusionTreeModule, BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DragulaModule } from 'ng2-dragula';
import { AuthInterceptor } from 'src/utilities/auth-interceptor';
import { SignalRService } from 'src/services/SignalRService';
import { ScheduleJopService } from 'src/services/ScheduleJopService';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TabsComponent } from './tools/querycomposer/taps/tabs.component';
import { TabComponent } from './tools/querycomposer/taps/tab.component';

import { LdabComponent } from './admin/securityManager/ldab/ldab.component';
import { SidebarLdabComponent } from './admin/securityManager/ldab/sidebar-ldab/sidebar-ldab.component';
import { MainContentLdabComponent } from './admin/securityManager/ldab/main-content-ldab/main-content-ldab.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { UploaderComponent } from './uploader/uploader.component';
import { SettingLdabComponent } from './admin/securityManager/ldab/setting-ldab/setting-ldab.component';
import { DatasourceComponent } from './admin/datasource/datasource.component';
import { DatasourceSidebarComponent } from './admin/datasource/datasource-sidebar/datasource-sidebar.component';
import { DatasourceMaincontentComponent } from './admin/datasource/datasource-maincontent/datasource-maincontent.component';
import { GraphcomposerComponent } from './tools/graphcomposer/graphcomposer.component';
import { GraphtypeComponent } from './tools/graphcomposer/graphtype/graphtype.component';
import { PropertiesComponent } from './tools/graphcomposer/properties/properties.component';
import { ViewComponent } from './tools/graphcomposer/view/view.component';

import { EntityService } from 'src/services/EntityService';
import { TablesRepository } from './data/tables.repository';
import { SitesRepository } from './data/sitesRepository';
import { SchedualJopDetailsComponent } from './tools/dataloaders/dataloader-infotable/schedual-jop-details/schedual-jop-details.component';

import { ApmFormationComponent } from './admin/apm-formation/apm-formation.component';
import { ApmFormationImportComponent } from './admin/apm-formation/apm-formation-import/apm-formation-import.component';
import { ApmFormationExportComponent } from './admin/apm-formation/apm-formation-export/apm-formation-export.component';
import { GraphGeneralComponent } from './tools/graphcomposer/graph-general/graph-general.component';
import { ColumnGraphComponent } from './tools/graphcomposer/graphs-row/column-graph/column-graph.component';
import { LineGraphComponent } from './tools/graphcomposer/graphs-row/line-graph/line-graph.component';
import { PieGraphComponent } from './tools/graphcomposer/graphs-row/pie-graph/pie-graph.component';
import { RadarGraphComponent } from './tools/graphcomposer/graphs-row/radar-graph/radar-graph.component';
import { ScatterGraphComponent } from './tools/graphcomposer/graphs-row/scatter-graph/scatter-graph.component';
import { StockGraphComponent } from './tools/graphcomposer/graphs-row/stock-graph/stock-graph.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { HeatMapAllModule } from '@syncfusion/ej2-angular-heatmap';
import { HeatMapGraphComponent } from './tools/graphcomposer/graphs-row/heat-map-graph/heat-map-graph.component';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ScatterDotsComponent } from './tools/graphcomposer/graphs-row/scatter-graph/scatter-dots/scatter-dots.component';
import { ScatterBubbleComponent } from './tools/graphcomposer/graphs-row/scatter-graph/scatter-bubble/scatter-bubble.component';
import { StockCompairComponent } from './tools/graphcomposer/graphs-row/stock-graph/stock-compair/stock-compair.component';
import { StockHistoryComponent } from './tools/graphcomposer/graphs-row/stock-graph/stock-history/stock-history.component';
import { AssetHierarchyAdminComponent } from './admin/configurationManager/asset-hierarchy-admin/asset-hierarchy-admin.component';
import { AssetHierarchyComponent } from './asset-hierarchy/asset-hierarchy.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
//import { DropdownTreeviewSelectModule } from './dropdown-treeview-select';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
     AppComponent,
    SidebarComponent,
    Sidebar2Component,
    LoginComponent,
    NOAccessComponent,
    SecurityManagerComponent,
    UsersComponent,
    UsersSideBarComponent,
    UsersFormComponent,
    RolesComponent,
    TabsComponent,
    TabComponent,
    SitesComponent,
    RolesComponent,
    UsersNavbarComponent,
    AddSiteComponent,
    AddRoleComponent,
    UploadComponent,
    ConfirmDialogComponent,
    InformationFormComponent,
    AccordionComponent,
    ConfigurationManagerTopNavComponent,
    FieldsComponent,
    FieldsInfoFormComponent,
    FieldsTableComponent,
    DropzoneComponent,
    ModalConfirmComponent,
    RolesSidebarComponent,
    SitesSidebarComponent,
    RoleInfoComponent,
    SitesTopNavComponent,
    UserRolesComponent,
    UserSitesComponent,
    SiteUsersComponent,
    UsersTopNavComponent,
    SiteInfoComponent,
    AddRoleRowComponent,
    AddSiteRowComponent,
    DisabledOnSelectorDirective,
    CatalogComponent,
    CatalogSidebarComponent,
    CatalogItemsTableComponent,
    DataSheetComponent,
    TableDataSheetComponent,
    InfoDataSheetComponent,
    EditSectionDataSheetComponent,
    TableLayoutDataSheetComponent,
    NavigationComponent,
    MainContentComponent,
    MainTapsComponent,
    OperationManagerComponent,
    ConfigurationmanagersComponent,
    ConfigurationManagerComponent,
    TablesSidebarComponent,
    TestComponent,
    RelationShipsComponent,
    RelationInfoComponent,
    RelationNavComponent,
    RelationDefComponent,
    RecordManagerComponent,
    RecordManagerSideBarComponent,
    RecordManagerContainerComponent,
    RelationShipsTableComponent,
    DatapermessionsComponent,
    SideBarPermissionComponent,
    MainContentDatapermissionComponent,
    DataloadersComponent,
    DataloaderSidebarComponent,
    DataloaderInfotableComponent,
    MainPageComponent,
    UOMComponent,
    UomSidebarComponent,
    UomNavbarComponent,
    UomMeasuringUnitsComponent,
    UomMeasuringSystemsComponent,
    QuerycomposerComponent,
    QuerycomposerNavbarComponent,
    QuerycomposerDesignComponent,
    QuerycomposerSqlComponent,
    QuerycomposerResultsComponent,
    MeasuringSystemComponent,
    MeasuringSystemSideBarComponent,
    MeasuringMainContentComponent,
    LdabComponent,
    SidebarLdabComponent,
    MainContentLdabComponent,
    UploaderComponent,
    SettingLdabComponent,
    DatasourceComponent,
    DatasourceSidebarComponent,
    DatasourceMaincontentComponent,
    GraphcomposerComponent,
    GraphtypeComponent,
    PropertiesComponent,
    ViewComponent,
    SchedualJopDetailsComponent,
    
    
    ApmFormationComponent,
    ApmFormationImportComponent,
    ApmFormationExportComponent,
    GraphGeneralComponent,
    ColumnGraphComponent,
    LineGraphComponent,
    PieGraphComponent,
    RadarGraphComponent,
    ScatterGraphComponent,
    StockGraphComponent,
    HeatMapGraphComponent,
    ScatterDotsComponent,
    ScatterBubbleComponent,
    StockCompairComponent,
    StockHistoryComponent,
    AssetHierarchyAdminComponent,
    AssetHierarchyComponent,
  ],
  entryComponents: [AddSiteComponent, AddRoleComponent],
  imports: [
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),// ToastrModule added
    PerfectScrollbarModule,
    CommonModule ,
    BrowserAnimationsModule,
    CheckBoxModule ,
    BrowserModule  ,
    DiagramModule,
    TooltipModule,
    RadioButtonModule,
    NgbModule,
    DragulaModule.forRoot(),
    ComboBoxModule,
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule,
    GridAllModule,
    HttpModule,
    TabModule,
    HttpClientModule,
    TextBoxModule,
    NumericTextBoxModule,
    ReactiveFormsModule,
    ChartAllModule,
    HeatMapAllModule,
    RangeNavigatorAllModule,
    NgxDatatableModule,
    AccumulationChartAllModule,
    HttpClientJsonpModule,
    SwitchModule,
    RlTagInputModule,
    BootstrapModule,
    MatTreeModule,
    MatIconModule,
    DatePickerModule,
    ButtonModule,
    DropDownButtonModule,
    MatButtonModule,
    NgSelectModule,
    FormsModuleAngular,
    ChartModule ,
    ListViewModule,
    FormsModule,
    ListBoxModule,
    DialogModule,
    DropzoneModule,
    RichTextEditorModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    TimepickerModule,
    TreeviewModule,
    syncFusionTreeModule,
    ContextMenuModule ,
    TableModule,
    TreeTableModule,
    AccordionModule,
    DragDropModule,
    PanelModule,
    AngularResizedEventModule,
    NgxDropzoneModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    DropDownListAllModule,
    ToolbarModule,
    UploaderModule  
  ],
  exports: [ConfirmDialogComponent],
  providers: [UserService, LoggedInGuard, DeactivateGuard, Repository,EntityService,
     SitesRepository, RolesRepository, TablesRepository, ConfirmDialogService, CatalogsRepository,RolesServeice,
     RelationshipService,AuthGuard ,{
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },UOMService,RelationRecordService,
    {
      provide: {PERFECT_SCROLLBAR_CONFIG },
      useValue: {DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    },ElasticSearchService ,SignalRService ,ScheduleJopService],
  bootstrap: [AppComponent],
 
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}

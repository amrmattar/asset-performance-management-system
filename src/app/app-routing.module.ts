import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/utilities/auth-guard';
import { CatalogComponent } from './admin/catalog/catalog.component';
import { ConfigurationManagerComponent } from './admin/configurationManager/configuration.manager.component';
import { ConfigurationmanagersComponent } from './admin/configurationmanagers/configurationmanagers.component';
import { OperationManagerComponent } from './admin/operation-manager/operation-manager.component';
import { DatapermessionsComponent } from './admin/securityManager/datapermessions/datapermessions.component';
import { DefaultsettingsComponent } from './admin/securitymanager/defaultsettings/defaultsettings.component';
import { LdabComponent } from './admin/securitymanager/ldab/ldab.component';
import { PasswordpolicyComponent } from './admin/securitymanager/passwordpolicy/passwordpolicy.component';
import { RolesComponent } from './admin/securityManager/roles/roles';
import { SecurityManagerComponent } from './admin/securitymanager/securitymanager.component';
import { SitesComponent } from './admin/securityManager/sites/sites';
import { UsersComponent } from './admin/securityManager/Users/users.component';
import { MainPageComponent } from './MainPage/MainPage.component';
import { RecordManagerComponent } from './record-manager/record-manager.component';
import { DataloadersComponent } from './tools/dataloaders/dataloaders.component';
import { LoginComponent } from './user/login/login.component';
import { UOMComponent } from './admin/uom/uom.component';
import { QuerycomposerComponent } from './tools/querycomposer/querycomposer.component';
import { MeasuringSystemComponent } from './admin/measuring-system/measuring-system.component';
import { DatasourceComponent } from './admin/datasource/datasource.component';
import { GraphcomposerComponent } from './tools/graphcomposer/graphcomposer.component';
import { ApmFormationComponent } from './admin/apm-formation/apm-formation.component';
import { AssetHierarchyComponent } from './asset-hierarchy/asset-hierarchy.component';
// import { AssetHierarchyAdminComponent } from './admin/configurationManager/asset-hierarchy-admin/asset-hierarchy-admin.component';
const routes: Routes = [
    
     
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainPageComponent,
    children: [

      { path: 'sc', component: SecurityManagerComponent},
      { path: 'u', component: UsersComponent},
      { path: 'r', component: RolesComponent},
      { path: 's', component: SitesComponent},
      { path: 'DP', component: DatapermessionsComponent},
      { path: 'LI', component: LdabComponent},
      { path: 'PP', component: PasswordpolicyComponent},
      { path: 'DS', component: DefaultsettingsComponent},
      { path: 'con', component:ConfigurationManagerComponent},
      { path: 'cons', component:ConfigurationmanagersComponent},
      { path: 'ent', component: ConfigurationManagerComponent},
      { path: 'OM', component: OperationManagerComponent},
      { path: 'Ct',component:CatalogComponent },
      { path: 'dl',component:DataloadersComponent },
      { path: 'uo',component:UOMComponent },
      { path: 'qc',component:QuerycomposerComponent },
      { path: 'RM/:id',component:RecordManagerComponent },
      { path: 'mss',component:MeasuringSystemComponent },
      { path: 'daso',component:DatasourceComponent },
      { path: 'gpc',component:GraphcomposerComponent },
      { path: 'apm',component:ApmFormationComponent },
      // { path: 'ashrad',component:AssetHierarchyAdminComponent },
      { path: 'ashrad',component:AssetHierarchyComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

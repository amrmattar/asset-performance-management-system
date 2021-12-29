import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-hierarchy-admin',
  templateUrl: './asset-hierarchy-admin.component.html',
  styleUrls: ['./asset-hierarchy-admin.component.scss']
})
export class AssetHierarchyAdminComponent implements OnInit {
  Parent_Family:any='Functional Location';
  Relationship:any='Functional Location Has Functional Location(s)';
  Child_Family:any='Functional Location';
  Display_Field:any='ENTY-ID';
  Taxonomy_Category:any='Taxonomy_Category';
  Taxonomy_Class:any='Taxonomy_Class';
  Taxonomy_Type:any='Taxonomy_Type';
  public data1: string[] = ['Functional Location', 'element 2', 'element 3', 'element 4', 'element 4'];
  public data2: string[] = ['Functional Location Has Functional Location(s)', 'element 2', 'element 3', 'element 4', 'element 4'];
  public data3: string[] = ['Functional Location', 'element 2', 'element 3', 'element 4', 'element 4'];
  public data4: string[] = ['ENTY-ID', 'element 2', 'element 3', 'element 4', 'element 4'];
  public data5: string[] = ['Taxonomy_Category', 'element 2', 'element 3', 'element 4', 'element 4'];
  public data6: string[] = ['Taxonomy_Class', 'element 2', 'element 3', 'element 4', 'element 4'];
  public data7: string[] = ['Taxonomy_Type', 'element 2', 'element 3', 'element 4', 'element 4'];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-manager',
  templateUrl: './record-manager.component.html',
  styleUrls: ['./record-manager.component.scss']
})
export class RecordManagerComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  id: number;
  private sub: any;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
   });
  }

}

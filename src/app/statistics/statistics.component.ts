import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  records = {
    insert: 0,
    retrieve: 0,
    update: 0,
    delete: 0
  };
  drivers: any[] = [];
  packages: any[] = [];

  constructor(private db:DatabaseService) { }

  ngOnInit(){

  this.db.getStats().subscribe((response:any)=>{
    this.records = response.data
  })

  this.db.getDriver().subscribe((data:any)=>{
      this.drivers = data;
  })

  this.db.getPackage().subscribe((data:any)=>{
    this.packages = data;
  })
  }
}

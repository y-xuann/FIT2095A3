import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  drivers: any[] = [];

  constructor(private db:DatabaseService, private router:Router) { }

  ngOnInit(){
    this.db.getDriver().subscribe((data:any)=>{
      this.drivers = data;
  })}

  deleteDriver(driverMongoId: string) {
    this.db.deleteDriver(driverMongoId).subscribe((data:any)=>{
      this.router.navigate(['list-drivers']);
    }
  )}

}

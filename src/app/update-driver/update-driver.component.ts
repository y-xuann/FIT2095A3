import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  driver = {id: '', driverDepartment: '', driverLicense:''};
  constructor(private db: DatabaseService, private router:Router) { }

  updateDriver() {
    this.db.updateDriver(this.driver).subscribe((data: any) => {
        this.router.navigate(['list-drivers']);
      },
      (error) =>{
        if (error.status === 400){
          this.router.navigate(['invalid-data']);
        }
      }
    );}
  
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  drivers:any[]=[]
  package = {packageTitle: '', packageWeight: '', packageDestination:'',description:'', isAllocated:false,  driverId:''};
  constructor(private db: DatabaseService, private router:Router) { }

  ngOnInit(){
    this.db.getDriver().subscribe((data:any)=>{
      this.drivers = data;
  })}

  addPackage() {
    this.db.createPackage(this.package).subscribe((data: any) => {
        this.router.navigate(['list-packages']);
      },
      (error) =>{
        if (error.status === 400){
          this.router.navigate(['invalid-data']);
        }
      }
    );}
}

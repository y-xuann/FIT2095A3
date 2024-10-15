import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  package = {packageId: '', packageDestination:''};
  constructor(private db: DatabaseService, private router:Router) { }

  updatePackage() {
    this.db.updatePackage(this.package).subscribe((data: any) => {
        this.router.navigate(['list-packages']);
      },
      (error) =>{
        if (error.status === 400){
          this.router.navigate(['invalid-data']);
        }
      }
    );}
}

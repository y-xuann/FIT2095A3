import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {
  packages: any[] = [];

  constructor(private db:DatabaseService, private router:Router) { }

  ngOnInit(){
    this.db.getPackage().subscribe((data:any)=>{
      this.packages = data;
  })}

  deletePackage(packageMongoId: string) {
    this.db.deletePackage(packageMongoId).subscribe((data:any)=>{
      this.router.navigate(['list-packages']);
    }
  )}
}

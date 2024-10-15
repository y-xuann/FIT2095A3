import { ChangeDetectorRef, Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ConvertWeightPipe } from '../pipes/convert-weight.pipe';


@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [ConvertWeightPipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {
  selectedPackage =""
  packages: any[] = [];
  assignedDriver: any = null

  constructor(private db:DatabaseService, private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.db.getPackage().subscribe((data:any)=>{
      this.packages = data;
  })}

  showDriver(driverId: string, packageName: string) {
    // Store the selected package name for UI display
    this.selectedPackage = packageName

    // Store the driver ID assigned to the package
    this.assignedDriver = driverId
    this.cd.detectChanges(); 
  }
}

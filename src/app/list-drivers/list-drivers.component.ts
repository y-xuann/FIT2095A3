import { ChangeDetectorRef, Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ConvertUpperPipe } from '../pipes/convert-upper.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [ConvertUpperPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {
  drivers: any[] = [];
  assignedPackages:any[]| null = null
  selectedDriver=""

  constructor(private db:DatabaseService, private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.db.getDriver().subscribe((data:any)=>{
      this.drivers = data;
  })}

  showPackage(driverMongoId: string, driverId:string) {
    // Store the selected driver ID
    this.selectedDriver = driverId

    // / Iterate over the drivers to find the one matching the given MongoDB ID
    for (let driver of this.drivers) {
      if (driver._id === driverMongoId) {
        this.assignedPackages = driver.assignedPackages; // Set the assigned packages
        this.cd.detectChanges();   // Update the view to reflect the changes
        break; 
      }
    }}

};
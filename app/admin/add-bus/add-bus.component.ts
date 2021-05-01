import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bus } from 'src/app/interface/bus';
import { Stopping } from 'src/app/interface/stopping';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {


  

  constructor(private adminService:AdminService) { }
  
  bus:Bus=new Bus();
  error1="";
  error2="";
  submitted=false;
  success1="";
  success2="";
  ngOnInit(): void {
    // this.submitted=false;
  }

  addBusForm=new FormGroup({
     busNumber:new FormControl('',[Validators.required]),
     routeNumber:new FormControl('',[Validators.required]),
     driverName:new FormControl('',[Validators.required]),
     driverPhoneNumber:new FormControl('',[Validators.required]),
     stoppingPoint:new FormControl('',[Validators.required]),
     fee:new FormControl('',[Validators.required]),
  });

  addBus(){
     this.adminService.addBus(this.addBusForm.value).subscribe(
      data=>{
        console.log(data),
        this.success1="Data Inserted Successfully";
        this.error1=null;},
      error1=>{
        this.error1="Data is not Added";
        this.success1=null;
      });
      this.bus=new Bus();
     
  }

  addStop(){
    var busNumber_temp=this.addBusForm.value.busNumber;
    console.log("stored busNumber:"+busNumber_temp);
    this.adminService.addStop(this.addBusForm.value,busNumber_temp).subscribe(
      data=>{
        console.log(data);
        this.success2="Data Inserted Successfully";
        this.error2=null;
      },
      error2=>{
        this.error2="Stop is Not Added";});
        this.success2=null;
  }

 get BusNumber(){
   return this.addBusForm.get('busNumber');
 }

 get RouteNumber(){
  return this.addBusForm.get('routeNumber');
}

get DriverName(){
  return this.addBusForm.get('driverName');
}
get DriverPhoneNumber(){
  return this.addBusForm.get('driverPhoneNumber');
}
get StoppingPoint(){
  return this.addBusForm.get('stoppingPoint');
}
get Fee(){
  return this.addBusForm.get('fee');
}



}

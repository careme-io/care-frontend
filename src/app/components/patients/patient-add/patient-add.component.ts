import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DBService } from '../../../services/db.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  providers: [DBService]
})
export class PatientAddComponent implements OnInit {

	patient : any;
	@Input() docID: string;
	@Output() closePatientAdd = new EventEmitter<{}>();
	@Output() addedPatient = new EventEmitter<{}>();
	cpForm: FormGroup;

	constructor(private dbService: DBService, private fb: FormBuilder) {
		this.createForm();
	}
	createForm(){
	  this.cpForm = this.fb.group({
	        name: ['', Validators.required],
	        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
	        email: [''],
	        age: [''],
	        city: ['']
	  });
	}

	ngOnInit() {}
	closePatientAddForm(){
		console.log('going to emit close');
		this.closePatientAdd.emit({});
	}

	// addPatient(newPat: NgForm){
	//   // console.log('patient', this.patient);
	//   var patient:any = Object.assign({}, newPat.value);
	//   patient.lat = 0;
	//   patient.long = 0;
	//   console.log(patient);
	// 	this.dbService.addPatient(patient).then(
	//     result => {
	//       console.log('patient added', result);
	//       this.addedPatient.emit({patID : result.id});
	//       //this.dbService.addDocPatient(this.docID, result.rows[0].id)
	//     }, error => {
	//       console.error(error);
	//     });

	// }
	addPatientClose(){
	  var patient:any = Object.assign({}, this.cpForm.value);
	  patient.lat = 0;
	  patient.long = 0;
	  console.log(patient);
		this.dbService.addPatient(patient).then(
	    result => {
	      console.log('patient added', result);
	      this.addedPatient.emit({patID : result.id});
	      this.closePatientAdd.emit({});
	    }, error => {
	      console.error(error);
	    });
	}


}

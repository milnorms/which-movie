import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  searchForm: FormGroup;
  submitted = false;
  success = false;

  searchTerm = {
    term : '',
    lastPage : false
  }


  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formbuilder.group(
      {
       search: ['', Validators.required]
      }
    )
  }



  onSubmit() {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.success = true;

    if (this.success) {
      this.searchTerm.term  = this.searchForm.controls.search.value;

      this.router.navigate(['/result'], { state : this.searchTerm });


    }
  }



  ngOnInit(): void {
  }



}

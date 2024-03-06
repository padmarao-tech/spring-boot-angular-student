import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,MatButtonModule],
  templateUrl: './student-dialog.component.html',
})
export class StudentDialogComponent implements OnInit {

  fg: UntypedFormGroup;
  loading: boolean;
  msg: any;
  constructor(
    private ds: DataService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialogRef: MatDialogRef<StudentDialogComponent>
  ) { }

  ngOnInit(): void {
    this.formInitialize();
    if (this.data) {
      this.formExisting();
    }
  }

  formInitialize() {
    this.fg = new UntypedFormGroup({
      name: new UntypedFormControl(),
      age: new UntypedFormControl(),
      email: new UntypedFormControl()
    })
  }

  formExisting() {
    this.fg = new UntypedFormGroup({
      name: new UntypedFormControl(this.data.name),
      age: new UntypedFormControl(this.data.age),
      email: new UntypedFormControl(this.data.email)
    })
  }

  save() {
    this.loading = true;
    this.fg.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    // console.log(this.shop);

    const sValue = Object.assign({}, this.fg.value);
    if (this.data) {
      this.data.name = sValue.name;
      this.data.age = sValue.age;
      this.data.email = sValue.email;
    }

    this.loading = true;
    this.ds.saveStudent(this.data ? this.data : sValue).subscribe(data => {
      this.loading = false;
      if (data.message == "Student saved successfully." || data.message == "Student update successfully.") {
        this.dialogRef.close(data);
      } else {
        this.msg = data?.message;
      }
    });

  }

  public cancel() {
    this.dialogRef.close();
  }
}

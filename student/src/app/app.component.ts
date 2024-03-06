import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog'
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student';
  students: any[];
  constructor(
    private ds: DataService,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.getStudents()
  }

  getStudents(){
    this.ds.getStudents({search_text: null, limit: null, offset: null, include_inactive: null}).subscribe((r: any) => {
      console.log(r);
      this.students = r;
    })
  }

  add(a?: any){
    if (!a) {
      a = null;
    }

    let config: MatDialogConfig = {
      width: '600px',
      disableClose: true,
      hasBackdrop: true,
      data: a
    };
    let dialogRef = this.dialog.open(StudentDialogComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.refreshToken$.next(undefined);
        this.getStudents();
      }
    });
  }

  delete(a?: any) {
    if (confirm('Are you sure to delete ?')) {
      this.ds.deleteStudent(a.id).subscribe(r => {
        console.log(r);
        if (r.message == 'Student deleted successfully.') {
          this.getStudents();
        }
      })
    }
  }
}

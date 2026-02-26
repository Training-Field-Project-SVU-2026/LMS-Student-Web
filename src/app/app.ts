import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lms-student-web');
    testAlert() {
    Swal.fire({
      title: 'Done 🎉',
      text: 'Operation completed successfully',
      icon: 'success'
    });
  }
}

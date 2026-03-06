import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Button } from "./components/shared/button/button";

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Button]
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

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class Alert {
    constructor(private alert: Alert) {}

testAlert() {
  this.alert.success('Done 🔥');
}

  private baseConfig = {
    confirmButtonColor: 'var(--primary)',
    cancelButtonColor: 'var(--disabled-button)',
    customClass: {
      popup: 'swal-popup'
    }
  };

  success(message: string) {
    Swal.fire({
      ...this.baseConfig,
      icon: 'success',
      title: message
    });
  }


}
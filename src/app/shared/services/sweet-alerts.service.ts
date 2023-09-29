import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SweetAlertsService {
  private router = inject(Router);

  infoAlert(message: string = 'Mensaje', icon: SweetAlertIcon = 'success', time = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center-end',
      showConfirmButton: false,
      timer: time,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  }

  infoAlertNavigate(
    title: string = 'Título',
    message: string = 'Mensaje',
    textConfirm: string = 'Confirmar',
    icon: SweetAlertIcon = 'success',
    path: string = '/'
  ) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: textConfirm,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([path]);
      }
    });
  }

  loadingAlert(message:string) {
    Swal.fire({
      title: message,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  imageAlert(title:string = 'Title', text:string = 'Recomendaciones', imageUrl:string){
    Swal.fire({
      title,
      text,
      imageUrl,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Nivel de nitrógeno',
    })
  }

  closeAllAlerts(){
    Swal.close()
  }
}

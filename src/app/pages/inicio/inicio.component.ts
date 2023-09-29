import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SweetAlertsService } from 'src/app/shared/services/sweet-alerts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  private alert = inject(SweetAlertsService);
  private sanitizer = inject(DomSanitizer);
  files: File[] = [];
  preview: string | ArrayBuffer | null = '';
  tiffFiles: string[] = [];

  async loadImages(event: any) {
    const filesLoad = event.target.files;
    if (filesLoad.length === 0) return;
    if (filesLoad.length > 5) {
      this.alert.infoAlert(
        'Solo se permiten máximo 5 imágenes',
        'error'
      );
      return;
    }
    let jpegImages: File[] = [];
    for (const file of filesLoad) {
      if (file.type !== 'image/tiff') {
        jpegImages.push(file);
      }
    }
    if (jpegImages.length > 1) {
      this.alert.infoAlert(
        'Solo se permiten cargar una imagen de tipo JPEG',
        'error'
      );
      return;
    }
    if (this.files.length > 0) {
      if (this.files.length + filesLoad.length > 5 && jpegImages.length === 0) {
        this.alert.infoAlert(`Solo se permiten cargar 5 imágenes (${this.files.length}/5)`, 'error');
        return;
      }
      let message = '';
      for (const file of filesLoad) {
        if (this.filterNames(this.files,file.name) === 0 && file.type !== 'image/tiff') {
          const index = this.files.findIndex((f) => f.type === file.type);
          if (index !== -1) this.files.splice(index, 1);
          this.files.push(file);
          const { base64 } = await this.extractBase64(file);
          this.preview = base64;
        } else if (this.filterNames(this.files,file.name) === 0 && this.tiffFiles.length < 4) {
          this.files.push(file);
          this.tiffFiles.push(file.name);
        } else {
          message += `"${file.name}" `;
        }
      }
      if (message !== '') {
        this.tiffFiles.length === 4 
        ? this.alert.infoAlert('No puedes cargar más de 4 imágenes TIF', 'error', 5000)
        : this.alert.infoAlert('Las siguientes imágenes ya se encuentran cargadas: ' + message, 'info', 5000);
      }
    } else {
      for (const file of filesLoad) {
        if(this.tiffFiles.length < 4){
          this.files.push(file);
          if (file.type !== 'image/tiff') {
            const { base64 } = await this.extractBase64(file);
            this.preview = base64;
          } else {
            this.tiffFiles.push(file.name);
          }
        }
        else{
          this.alert.infoAlert('No puedes cargar más de 4 imágenes TIF', 'info', 5000);
        }
      }
    }
  }

  deleteTiff(index: number) {
    const fileToDelete = this.tiffFiles[index];
    const indexFile = this.files.findIndex((f) => f.name === fileToDelete);
    this.files.splice(indexFile, 1);
    this.tiffFiles.splice(index, 1);
  }

  proccessImages() {
    //todo: verificar que vayan 4 tiff y 1 jpeg
    console.log(this.files);
  }

  extractBase64 = async (
    $event: any
  ): Promise<{ base64: string | ArrayBuffer | null }> =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base64: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base64: null,
          });
        };
      } catch (e) {
        console.log(e);
      }
    });

  filterNames(files: File[], fileName: string):number {
    return files.filter((file) => file.name === fileName).length;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, throwError } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { SweetAlertsService } from 'src/app/shared/services/sweet-alerts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  private alert = inject(SweetAlertsService);
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpService)
  private render2 = inject(Renderer2)
  files: File[] = [];
  preview: string | ArrayBuffer | null = '';
  tiffFiles: string[] = [];
  processing = false
  @ViewChild('inputFile') inputFile!:ElementRef

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
    }
      else {
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
    let tiffs = 0;
    let jpeg = 0;
    for (const file of this.files) {
      if(file.type === 'image/tiff'){
        tiffs++;
      }
      else if(file.type === 'image/jpeg'){
        jpeg++;
      }
    }
    if(tiffs === 4 && jpeg === 1){
      const formData = new FormData();
      for (const file of this.files) {
        formData.append('files', file);
      }
      this.processing = true;
      this.http.postImages(formData)
      .pipe(
        catchError((err:HttpErrorResponse) => {
          this.processing = false;
          const {error, status} = err;          
          if (status === 0) {
            this.alert.infoAlert('Ha ocurrido un error de conexión', 'error')
          }
          else{
            this.alert.infoAlert('Ha ocurrido un error: ' + error.error, 'error', 5000);
          }
          return throwError(() => new Error('Something bad happened; please try again later.'));
        }
      ))
      .subscribe(({nitrogen})=>{
        this.processing = false;
        nitrogen = Number(nitrogen.toFixed(3))
        const { title, text, imageUrl } = this.estimation(nitrogen);
        this.alert.imageAlert(title, text, imageUrl);
        this.resetFiles()
      });
    }
    else{
      this.alert.infoAlert('No se ha podido procesar la imagen. Debes cargar 4 imágenes TIFF y una JPEG.', 'error', 5000);
      return
    }
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

  estimation(nitrogen:number){
    switch (true) {
      case nitrogen <= 3.6:
        return {
          title: `Nivel de nitrógeno: ${nitrogen}% (Déficit)`,
          text: 'Con una estimación de nitrógeno menor a este porcentaje la hoja se encuentra en un deficit, por lo tanto se debe hacer un plan de fertilización',
          imageUrl: 'assets/low.png'
        }
      case nitrogen >3.6 && nitrogen <= 4.6:
        return {
          title: `Nivel de nitrógeno: ${nitrogen}% (Óptimo)`,
          text: 'La estimacion entre estos porcentajes indican que la hoja se encuentra en un porcentaje óptimo, siga con el plan de fertilización que venía aplicando',
          imageUrl: 'assets/medium.png'
        }
      case nitrogen > 4.6:
        return {
          title: `Nivel de nitrógeno: ${nitrogen}% (Exceso)`,
          text: 'Con una estimación de nitrógeno mayor a este porcentaje la hoja se encuentra en exceso, no se puede realizar plan de fertilización',
          imageUrl: 'assets/high.png'
        }
        default:
          return {
            title: `Falla en la estimación de nitrógeno`,
            text: 'Intente cargar de nuevo las imágenes',
            imageUrl: 'assets/low.png'
          }
    }
  }

  resetFiles(){
    this.files = [];
    this.preview = '';
    this.tiffFiles = [];
    const buttonInput = this.inputFile.nativeElement
    this.render2.setProperty(buttonInput, 'value', '')
  }
}
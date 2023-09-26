import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent{
  selectedFolder: any;
  estimacionResultado: number | null = null;
  auth = inject(AuthService);
   constructor(private http: HttpClient) {}
  
  handleFolderSelection(event: any) {
    const selectedFiles = event.target.files;
    let jpegImageCount = 0;
  
    // Verifica si se seleccionaron exactamente 5 archivos
    if (selectedFiles.length === 5) {
      // Verifica si al menos uno de los archivos es una imagen JPEG
      for (const file of selectedFiles) {
        if (file.type === 'image/jpeg') {
          jpegImageCount++;
        }
      }
  
      if (jpegImageCount > 0) {
        // Continúa con la asignación de la carpeta seleccionada
        this.selectedFolder = selectedFiles[0];
        this.selectedFolder.files = Array.from(selectedFiles);
      } else {
        // Muestra un mensaje de error si no hay imágenes JPEG
        alert('Debes seleccionar una carpeta con al menos una imagen JPEG.');
        // Puedes realizar otras acciones según tus necesidades, como deshabilitar botones o realizar otras validaciones.
      }
    } else {
      // Muestra un mensaje de error si no se seleccionaron exactamente 5 archivos
      alert('Debes seleccionar exactamente 5 archivos.');
      // Puedes realizar otras acciones según tus necesidades, como deshabilitar botones o realizar otras validaciones.
    }
  }
  

  processFolder() {
    // Crea un objeto FormData para enviar la carpeta de imágenes
    const formData = new FormData();
    formData.append('carpeta', this.selectedFolder);

    // Realiza la solicitud POST a la API Flask
    this.http.post<any>('http://localhost:5000/procesar_carpeta', formData).subscribe(
      (response) => {
        // Maneja la respuesta del servidor aquí
        console.log('Respuesta del servidor:', response);
        this.estimacionResultado = response.resultado;
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  reset() {
    this.estimacionResultado = null;
    this.selectedFolder = null;
  }
}
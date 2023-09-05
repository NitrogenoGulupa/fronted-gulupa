import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  selectedFolder: any;
  estimacionResultado: number | null = null;
  constructor(private http: HttpClient) {}

  handleFolderSelection(event: any) {
    const selectedFiles = event.target.files;
  
    // Verifica si se seleccionaron exactamente 5 archivos
    if (selectedFiles.length === 5) {
      // Continúa con la asignación de la carpeta seleccionada
      this.selectedFolder = selectedFiles[0];
      this.selectedFolder.files = Array.from(selectedFiles);
    } else {
      // Muestra un mensaje de error o realiza la acción que consideres adecuada
      console.error('Debes seleccionar exactamente 5 imágenes.');
      // Puedes mostrar un mensaje al usuario o realizar otra acción según tus necesidades
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
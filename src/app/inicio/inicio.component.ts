
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(public authService: AuthService) {}
  selectedFolder: any;
  estimacionResultado: number | null = null;

  handleFolderSelection(event: any) {
    const selectedFolders = event.target.files;
    if (selectedFolders && selectedFolders.length > 0) {
      this.selectedFolder = selectedFolders[0];
    }
  }

  processFolder() {
    // Simulación de proceso de estimación
    // Puedes reemplazar esto con la lógica real de estimación.
    this.estimacionResultado = Math.floor(Math.random() * 100); // Número aleatorio entre 0 y 100
  }

  reset() {
    this.estimacionResultado = null;
    this.selectedFolder = null;
  }
}


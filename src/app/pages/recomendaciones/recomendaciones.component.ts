import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  porcentajes: string[] = [];

  constructor() {
    // Genera la lista de porcentajes
    for (let i = 0; i < 10; i++) {
      const inicio = i * 10;
      const fin = inicio + 10;
      this.porcentajes.push(`${inicio}% - ${fin}%`);
    }
  }

  ngOnInit(): void {
  }
}

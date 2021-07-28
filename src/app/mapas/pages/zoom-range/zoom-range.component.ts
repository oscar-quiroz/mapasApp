import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 15px;
        width: 400px;
        z-index: 9000;
      }
    `,
  ],
})
export class ZoomRangeComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('mapa2') divMapa: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-73.35356199370266, 5.542192054255647];

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (event) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }

      this.mapa.on('move', (event) => {
        const target = event.target;
        const { lng, lat } = target.getCenter();
        this.center = [lng, lat];
      });
    });
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('move', () => {});
    this.mapa.off('zoomend', () => {});
  }

  zoomIn() {
    this.mapa.zoomIn();
    //  this.zoomLevel = this.mapa.getZoom()
  }

  zoomOut() {
    this.mapa.zoomOut();
    //this.zoomLevel = this.mapa.getZoom()
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }
}

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardNavigationService {
  zoom = {
    amount: 1,
    max: 3,
    min: 0.2,
    step: 0.1,
    scrollStep: 0.1,
    origin : {
      x: '50%',
      y: '50%'
    }
  };
  position = {
    x: 0,
    y: 0,
  };
  dragListenerFn: any;
  stopDragListenerFn: any;
  dragPos = {
    x: 0,
    y: 0,
  };
  renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  changeZoom(amount: number, origin: {x: string, y: string}) {
    if (amount <= this.zoom.max && amount >= this.zoom.min) {
      this.zoom.amount = amount;
      this.zoom.origin = origin
    }
  }

  scrollZoom(delta: number, origin: {x: string, y:string}) {
    if (delta > 0 && this.zoom.amount < this.zoom.max) {
      this.zoom.amount += this.zoom.scrollStep;
    } else if (delta < 0 && this.zoom.amount > this.zoom.min) {
      this.zoom.amount -= this.zoom.scrollStep;
    }
    this.zoom.origin = origin
    this.zoom.amount = this.zoom.amount;
  }

  startDrag(dragStartX: number, dragStartY: number) {
    if (this.dragListenerFn) {
      this.dragListenerFn();
      this.stopDragListenerFn();
    }
    this.dragPos.x = dragStartX;
    this.dragPos.y = dragStartY;
    this.dragListenerFn = this.renderer.listen(
      'window',
      'mousemove',
      (m: MouseEvent) => {
        const deltaX = m.clientX - this.dragPos.x;
        const deltaY = m.clientY - this.dragPos.y;
        this.position.x += deltaX / this.zoom.amount;
        this.position.y += deltaY / this.zoom.amount;
        this.dragPos.x = m.clientX;
        this.dragPos.y = m.clientY;
      }
    );
    this.stopDragListenerFn = this.renderer.listen('window', 'mouseup', () => {
      this.dragListenerFn();
      this.stopDragListenerFn();
    });
  }

  
}

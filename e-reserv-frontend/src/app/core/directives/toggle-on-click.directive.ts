import { Directive, HostListener } from '@angular/core';
import { MatSelect } from '@angular/material/select';

// Usage: <mat-select toggleOnClick>...</mat-select>
@Directive({
  selector: 'mat-select[toggleOnClick]',
  standalone: true,
})
export class ToggleOnClickDirective {
  constructor(private sel: MatSelect) {}

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.sel.panelOpen ? this.sel.close() : this.sel.open();
  }
}


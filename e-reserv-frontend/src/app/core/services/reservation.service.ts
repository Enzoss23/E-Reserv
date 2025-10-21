import { Injectable, computed, signal } from '@angular/core';
import { CustomerInfo, ReservationDetails, ReservationPayload } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private detailsSig = signal<ReservationDetails | null>(null);
  private customerSig = signal<CustomerInfo | null>(null);

  readonly details = computed(() => this.detailsSig());
  readonly customer = computed(() => this.customerSig());

  setDetails(details: ReservationDetails) {
    this.detailsSig.set(details);
    sessionStorage.setItem('reservation.details', JSON.stringify(details));
  }

  setCustomer(customer: CustomerInfo) {
    this.customerSig.set(customer);
    sessionStorage.setItem('reservation.customer', JSON.stringify(customer));
  }

  loadFromStorage() {
    const d = sessionStorage.getItem('reservation.details');
    const c = sessionStorage.getItem('reservation.customer');
    if (d) this.detailsSig.set(JSON.parse(d));
    if (c) this.customerSig.set(JSON.parse(c));
  }

  clear() {
    this.detailsSig.set(null);
    this.customerSig.set(null);
    sessionStorage.removeItem('reservation.details');
    sessionStorage.removeItem('reservation.customer');
  }

  buildPayload(): ReservationPayload | null {
    const d = this.detailsSig();
    const c = this.customerSig();
    if (!d || !c) return null;
    return { ...d, customer: c };
  }
}


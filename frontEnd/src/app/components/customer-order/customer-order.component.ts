import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'tr[app-customer-order]',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  @Input('order') order: any;
  @Output() change = new EventEmitter();

  timer: String = "Calculating...";

  constructor(private orderService: OrderService, private router: Router) { }

  formatDate(time: number) {
    if (time < 0) {
      return null
    }
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`
  }

  viewOrder() {
    this.router.navigate(['/order/detail/' + this.order._id]);

  }

  getStatus(status: any) {
    if (status == "pending") {
      return "Pending"
    } else if (status == "arrive") {
      return "Arrived"
    } else if (status == "shipping") {
      return "Shipping"
    } else {
      return "Cancelled"
    }
  }

  getStyle(status: any) {

    if (status == 'pending') {
      return "color:#2268d0; backgroundColor: #f2f4f8"
    }
    else if (status == 'shipping') {
      return "color:#ffc107; backgroundColor: #fff7e6"
    }
    else if (status == 'arrive') {
      return "color:#08b967; backgroundColor: #f2f4f8"
    }
    else {
      return "color:#ef0f24; backgroundColor: #f9ebeb"
    }

  }


  ngOnInit(): void {
    let x = setInterval(() => {
      let customerBuyDate = new Date(this.order.date)
      let dateDiff: any = this.formatDate(new Date(customerBuyDate.setDate(customerBuyDate.getDate() + 1)).getTime() - new Date().getTime());
      this.timer = dateDiff
    }, 1000)
    if (this.order.order_status == "arrive") {
      clearInterval(x)
      this.timer = "---"
    }
    if (this.order.order_status == "cancel") {
      clearInterval(x)
      this.timer = "Timeout"
    }
  }

}

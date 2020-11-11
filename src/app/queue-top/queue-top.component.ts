import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue-top',
  templateUrl: './queue-top.component.html',
  styleUrls: ['./queue-top.component.css']
})
export class QueueTopComponent implements OnInit {
 
 @Input() queue: string ;
  constructor() { }

  ngOnInit(): void {
  }

}

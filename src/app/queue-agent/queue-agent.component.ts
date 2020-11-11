import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue-agent',
  templateUrl: './queue-agent.component.html',
  styleUrls: ['./queue-agent.component.css']
})
export class QueueAgentComponent implements OnInit {

  @Input() agent: string ;
  constructor() { }

  ngOnInit(): void {
  }

}

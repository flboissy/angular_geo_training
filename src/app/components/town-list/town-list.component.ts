import { Component, OnInit } from '@angular/core';
import { TownService } from 'src/app/services/town/town.service';
import { Town } from 'src/app/model/town';

@Component({
  selector: 'app-town-list',
  templateUrl: './town-list.component.html',
  styleUrls: ['./town-list.component.css']
})
export class TownListComponent implements OnInit {

  constructor(private townService: TownService) { }

  towns: Town[];

  getTowns() {
    this.townService.getTown()
      .subscribe(resp => {
        for (const data of resp.body) {
          this.towns.push(data);
        }
      });
    console.log(JSON.stringify(this.towns));
  }

  ngOnInit() {
    this.getTowns();
  }

}

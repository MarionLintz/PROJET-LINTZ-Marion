import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectedFilter } from 'src/shared/models/selected-filter';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  @Output() onFilterChange: EventEmitter<SelectedFilter> =
    new EventEmitter<SelectedFilter>();

  public selectedFilterValue: string = '';
  public detailFilterValue: string = '';

  constructor() {}

  ngOnInit(): void {}

  OnFilterSelectedChange() {
    this.onFilterChange.emit({
      global: this.selectedFilterValue,
      detail: this.detailFilterValue,
    });
  }
}

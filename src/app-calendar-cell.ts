import { computedFrom } from "aurelia-binding";
import { bindable, autoinject } from "aurelia-framework";
import { RegistryService } from "./registy-service";

function randomMilliseconds() {
  return Math.floor(Math.random() * 500);
}

@autoinject
export class AppCalendarCell {

  @bindable hour
  isSearching: boolean
  searchResults: {
    options: number | null
  }

  constructor(private registryService: RegistryService) {
    this.isSearching = false
    this.searchResults = {
      options: null
    }
    this.registryService.addCell(this);
  }

  @computedFrom("isSearching", "searchResults")
  get showSearchResults() {
    return !this.isSearching && this.searchResults.options !== null;
  }

  @computedFrom("isSearching", "searchResults")
  get showTime() {
    return !this.isSearching && this.searchResults.options === null;
  }

  @computedFrom('searchResults',"isSearching")
  get resultClass() {
    if (this.searchResults.options > 3) {
      return 'goodresults'
    } else if (this.searchResults.options > 0) {
      return 'weakresults'
    } else if (this.searchResults.options === 0 ){
      return 'badresults'
    }
    return 'searching'
  }

  cellClicked() {
    let alreadySearching = this.isSearching;
    this.searchResults.options = null;
    this.isSearching = !alreadySearching;


    if (!alreadySearching) {
      // Simulate an AJAX request:
      this.isSearching = true;

      setTimeout(() => {
        this.isSearching = false;
        this.searchResults.options = Math.floor(Math.random() * 5);

      }, randomMilliseconds());
    }
  }
}

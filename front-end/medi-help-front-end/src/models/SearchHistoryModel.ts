class SearchHistoryModel {
  searchId: number;
  sercherId: number;
  searcherText: string;
  
  

  constructor(searchId: number, sercherId: number, searcherText: string) {
    this.searchId = searchId; 
    this.sercherId = sercherId;
    this.searcherText = searcherText;
  }
}

export default SearchHistoryModel;
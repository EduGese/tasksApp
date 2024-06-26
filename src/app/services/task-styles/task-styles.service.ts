import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskStylesService {

  constructor() { }


  priorityColor(priority: string): string{
    if(priority === 'H'){
      return 'danger';
    }else if(priority === 'M'){
      return 'warning';
    }else{
      return 'success';
    } 
  }
  tagIcon(tag:string):string{
    switch(tag){
      case 'Work':
        return 'hammer-outline';
      case 'Personal':
        return 'person-outline';
      case 'Study':
        return 'book-outline';
      case 'Home':
        return 'home-outline';
      case 'Finance':
        return 'cash-outline';
      case 'Health':
        return 'medkit-outline';
      case 'Leisure':
        return 'beer-outline';
      default:
        return 'help-circle-outline';
    }
  }
  tagIconColor(tag:string):string{
    switch(tag){
      case 'Work':
        return 'primary';
      case 'Personal':
        return 'secondary';
      case 'Study':
        return 'terciary';
      case 'Home':
        return 'warning';
      case 'Finance':
        return 'success';
      case 'Health':
        return 'danger';
      case 'Leisure':
        return 'dark';
      default:
        return 'medium';
    }
  }
}

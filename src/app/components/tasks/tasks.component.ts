import { TaskStylesService } from './../../services/task-styles/task-styles.service';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Task } from '../../models/task';
import { ActionSheetController } from '@ionic/angular/standalone';
import { TaskFormComponent } from "../task-form/task-form.component";
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { IonItemSliding } from '@ionic/angular';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TaskFormComponent,
    TaskDetailsComponent,
  ],
})
export class TasksComponent {
  @Input() taskList: Task[] = [];
  @Output() taskIdDeleteEmitted = new EventEmitter<number>();
  @Output() taskCompleteEmitted = new EventEmitter<Task>();
  task: Task = {} as Task;
  isEditForm = true;


  constructor(
    private actionSheetCtrl: ActionSheetController,
    private taskStylesService: TaskStylesService,
    private modalCtrl: ModalController
  ) {}

  //STYLING
 
  priorityColor(priority: string): string {
    return this.taskStylesService.priorityColor(priority);
  }
  tagIcon(tag: string): string {
    return this.taskStylesService.tagIcon(tag);
  }
  tagIconColor(tag: string): string {
    return this.taskStylesService.tagIconColor(tag);
  }
  isTaskPast(task: Task){
    const dueDate = new Date(task.due_date);
    const dateTimeNow = new Date()
    if(dateTimeNow > dueDate){
      return true;
    }else{
      return false;
    }
  }
  setTaskColor(task: Task, isText: boolean): string {
   if(task.due_date === '' || task.due_date === 'Invalid Date'){
    return isText ? 'dark' : 'taskNodate-container';
   }else if(this.isTaskPast(task)){
    return isText ? 'danger' : 'taskPast-container'; 
   }else{
    return isText ? 'warning' : 'taskDue-container'; 
   }  
  }


  //SLIDING

  // ActionSheet functions
  async openActionSheet(task: Task, slidingItem: IonItemSliding) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `You are going to delete ${task.name} `,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteTask(task.id, slidingItem);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
        },
      ],
      cssClass: 'custom-css',
      animated: true,
      backdropDismiss: true,
      mode: 'ios',
    });

    actionSheet.present();
  }
  deleteTask(id: number, slidingItem:IonItemSliding) {
    this.taskIdDeleteEmitted.emit(id);
    slidingItem.close()
  }
  completeTask(task: Task, slidingItem: IonItemSliding) {
    this.taskCompleteEmitted.emit(task);
    slidingItem.close();
  }

  // MODAL details
  async openModalDetails(task: Task) {
    this.task = task;
    const modal = await this.modalCtrl.create({
      component: TaskDetailsComponent,
      componentProps: {
        task: this.task,
      },
    });
    await modal.present();
  }

  //MODAL editForm
  async openModalEditForm(task: Task) {
    this.task = task;
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: {
        task: this.task,
      },
    });
    await modal.present();
  }

 
}

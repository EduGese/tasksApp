import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../models/task';
import { of, switchMap } from 'rxjs';


@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TasksComponent]
})
export class CompletedTasksPage implements OnInit {
  taskList: Task[] = [];
  constructor( private storage: StorageService) { }

  ngOnInit(): void {
    try {
      this.storage
        .taskState()
        .pipe(
          switchMap((res) => {
            if (res) {
              return this.storage.fetchTasks();
            } else {
              return of([]); // Return an empty array when res is false
            }
          })
        )
        .subscribe((data) => {
          this.taskList = data
            .filter((task: Task) => task.done !== 0)
            .map((task: Task) => ({
              ...task,
              due_date: new Date(task.due_date),
            }))
            .sort(
              (a: any, b: any) => a.due_date.getTime() - b.due_date.getTime()
            )
            .map((task: any) => ({
              ...task,
              due_date: task.due_date.toString(),
            }));
        });
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  deleteTask(id: number) {
    if (id) {
      this.storage.deleteTaskById(id.toString());
    }
  }
  completeTask(task: Task) {
    console.log('Task completed:', task)
    if(task.done === 0){
      this.storage.updateTaskStatusById(task.id.toString(), true);
    }else{
      this.storage.updateTaskStatusById(task.id.toString(), false);
    }
    // if (id) {
    //   this.storage.updateTaskStatusById(id.toString());
    // }
  }

}
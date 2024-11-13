import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule


interface Task {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  newTask: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
      this.filterTasks('all');
    }
  }

  onKey(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.addTask();
    }
  }

  filterTasks(filter: string) {
    if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (filter === 'active') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
}

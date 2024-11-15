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
  isDark: boolean = false;

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

  
// counts tasks left
get remainingTasksCount(): number {
  return this.tasks.filter(task => !task.completed).length;
}

// remove task
removeTask(taskToRemove: Task) {
  this.tasks = this.tasks.filter(task => task !== taskToRemove);
  this.filterTasks('all'); // Update filtered tasks after removal
}

// clear all tasks
clearAllTasks() {
  this.tasks = [];
  this.filterTasks('all'); // Update filtered tasks after clearing
}

  // toggle dark/light mode
toggleMode() {
  this.isDark = !this.isDark; // Toggle the dark mode state
}
}

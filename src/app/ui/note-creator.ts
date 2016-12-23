import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'note-creator',
  styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  `],
  template: `
    <div class="note-creator shadow-2">
      <form class="row" (ngSubmit)="onCreateNote()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
          (focus)="toggle(true)"
        >
        <div class="actions col-xs-12 row between-xs">
          <button
            type="submit"
            class="btn-light"
            *ngIf="fullForm"
           >
            Done
          </button>
        </div>
      </form>
    </div>
  `
})
export class NoteCreator {
    fullForm: boolean =false;
  @Output() createNote = new EventEmitter();
  newNote = {
    title: '',
    value: ''
  };

  onCreateNote() {
    const { title, value } = this.newNote;

    if (title && value) {
      this.createNote.next({ title, value });
    }

    this.reset();
      this.toggle(false);
  }

  reset() {
    this.newNote = {
      title: '',
      value: ''
    };
  }
  toggle(value){
      this.fullForm = value;
  }
}

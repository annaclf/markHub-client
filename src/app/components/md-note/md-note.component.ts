import { Component, OnInit } from '@angular/core';
import { MdBooksService } from '../../services/md-books.service';
import { MdNotesService } from '../../services/md-notes.service';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-md-note',
  templateUrl: './md-note.component.html',
  styleUrls: ['./md-note.component.css']
})
export class MdNoteComponent implements OnInit {

  actualRoute: string;

  id: number;
  isEditing = false;
  mdBooks: Object;
  mdNote : any;
  markdown: any;

  constructor(  
    private location: Location, 
    private router: Router,
    private mdNotesService: MdNotesService,
    private route: ActivatedRoute
  ) { }

    public pipeMarkDown = '# Markdown';
  
    ngOnInit(){
      this.route.params.subscribe((val) => {
        this.mdNotesService.getOne(val.id)
        .then(mdNote => {
          this.id = val.id;
          this.mdNote = mdNote;
          this.markdown = this.mdNote.content;
        })
        .catch(err => {
          console.error(err);
        });
      });
  }
  
  handleEdit(){
    this.isEditing = !this.isEditing;
  }

  saveChanges(){
    this.handleEdit();
    const data = {
      title: this.mdNote.title,
      content: this.markdown;
    }
    console.log(data)
    this.mdNotesService.edit(this.id, data)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log('FAIL')
    })
  }


}



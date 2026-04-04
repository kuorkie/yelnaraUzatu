import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {collection, addDoc, Firestore} from '@angular/fire/firestore';
import {NgxSpinner, NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-rsvp',
  imports:[FormsModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent {

  rsvpForm: FormGroup;
  firestore = inject(Firestore)
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService) {
    this.rsvpForm = this.fb.group({
      name: ['', Validators.required],
      attend: ['', Validators.required]
    });
  }
  fireCollection =  collection(this.firestore,'yelnaraUzatu')

  onSubmit() {
    if (this.rsvpForm.valid) {
      const rsvpData = this.rsvpForm.value;
      this.spinner.show()
      addDoc(
        this.fireCollection,rsvpData
      ).then(() => {
        this.spinner.hide()
        alert('Жауабыңызға рақмет!');
        this.rsvpForm.reset();
      }).catch((error) => {
        this.spinner.hide()
        console.error('Ошибка при добавлении данных:', error);
        alert('Қайтадан теріп көріңіз!');
      });
    }
  }
}

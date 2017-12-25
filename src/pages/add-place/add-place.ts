import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.76,
    lng: 40.76
  }
  locationIsSet = false;

  constructor(private modalController: ModalController ) {
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
  }

  onOpenMap() {
    const modal = this.modalController.create(SetLocationPage, { location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.location = data.location;
          this.locationIsSet = true;  
        }
      }
    )
  }
}

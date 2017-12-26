import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

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

  constructor(private geolocation: Geolocation, private modalController: ModalController ) {
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

  onLocate() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      this.locationIsSet = true;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}

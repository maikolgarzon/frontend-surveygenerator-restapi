import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile: Profile = new Profile();
  public photo!: File | null;
  fileLoaded = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getCurrentProfile();
  }

  getCurrentProfile() {
    this.profileService.getCurrentProfile().subscribe(
      (data) => {
        this.profile = data;
        console.log("profile_name:" + this.profile.name);
      });
  }

  selectPhoto(event: any) {
    this.photo = event.target.files[0];

    if (this.photo != null && this.photo.type.indexOf('image') < 0) {
      Swal.fire(
        'Error, the selected file is not an image.',
        'The photo could not be saved because a valid image format was not selected.',
        'error'
      );
      this.photo = null;
    }
  }

  savePhoto() {
    if (!this.photo) {
      Swal.fire(
        'Error, debe seleccionar una imagen.',
        'no se pudo guardar la foto porque no se selecciono ninguna imagen.',
        'error'
      );
    } else {
      this.profileService.uploadPhoto(this.photo).subscribe(() => {
        console.log("current_photo = " + this.photo);
        Swal.fire(
          'Update photo',
          'the photo has been udapte',
          'success'
        ).then(() => {
          location.reload();
        });
      }
      );
    }

  }

  editCurrentProfile() {
    this.profileService.editProfile(this.profile).subscribe(() => {
      Swal.fire(
        'updated profile data',
        'profile data has been updated',
        'success'
      ).then(() => {
        window.location.reload();
      })
    });
  }

}

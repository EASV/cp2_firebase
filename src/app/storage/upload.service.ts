import {Inject, Injectable} from '@angular/core';
import {AngularFire, FirebaseApp} from "angularfire2";
import {ReplaySubject} from "rxjs";
import {User} from "../users/user";

@Injectable()
export class UploadService {

  constructor(public af: AngularFire,
              @Inject(FirebaseApp) private firebaseApp: any) { }

  uploadProfileImage(user, img) {
    // Create a root reference
    let storageRef = this.firebaseApp.storage().ref();

    let af = this.af;
    let path = `/profile/${user.$key}`;
    var iRef = storageRef.child(path);
    iRef.putString(img, 'base64', {contentType: 'image/png'}).then((snapshot) => {
      console.log('Uploaded a blob or file! Now storing the reference at',`/profile/images/`);
      af.database.object(`users/${user.$key}/profile/image`).update({ path: path, filename: user.$key })
    });
  }

  getProfileImage(user : User) :  ReplaySubject<any>{
    let resultSubject = new ReplaySubject(1);
    let storage = this.firebaseApp.storage();

    this.af.database.object(`users/${user.$key}/profile/image`)
      .subscribe(image => {
        console.log('image', image);
        if(image.path != null){
          console.log('one', image);
          var pathReference = storage.ref(image.path);
          pathReference.getDownloadURL().then(url => {
            let result = {image: url, path: image.path, filename: image.filename};
            console.log('two', result);
            resultSubject.next(result);
            //this.profileImage = result;
          });

        }
      });

    return resultSubject;
  }


}

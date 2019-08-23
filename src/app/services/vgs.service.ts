import { Injectable } from '@angular/core';
import { Vg } from '../models/vg.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class VgsService {

  vgs: Vg[] = [] ;
  vgsSubject = new Subject<Vg[]>();


  constructor() { }

  emitVgs() {
    this.vgsSubject.next(this.vgs);
  }

  saveVgs() {
    firebase.database().ref('/vgs').set(this.vgs);
  }

  editVgs() {
    firebase.database().ref('/vgs/:id').set(this.vgs);
  }

  getVgs() {
    firebase.database().ref('/vgs')
    .on('value', (data) => {
      this.vgs = data.val() ? data.val() : [] ;
      this.emitVgs();
    });
  }

  getSingleVg(id: number) {
    return new Promise (
      (resolve, reject) => {
        firebase.database().ref('/vgs/' + id).once('value').then(
          // récupérer des données 1 fois
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }

        );
      }
    );
  }

  createNewVg(newVg: Vg) {
    this.vgs.push(newVg);
    this.saveVgs();
    this.emitVgs();
  }


   editVg(newVg: Vg) {
    this.vgs.push(newVg);
    this.editVgs();
    this.emitVgs();

   }



  removeVg(vg: Vg) {
    if (vg.photo) {
      const storageRef = firebase.storage().refFromURL(vg.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé :' + error);
        }
      );
    }
    const vgIndexToRemove = this.vgs.findIndex(
      (vgEl) => {
        if (vgEl === vg) {
          return true;
        }
      }
    );


    this.vgs.splice(vgIndexToRemove, 1);
    this.saveVgs();
    this.emitVgs();

  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file)
          .then(snapshot => {
            // retourne une Promise avec un lien de téléchargement
             return snapshot.ref.getDownloadURL();
           })
           .then(downloadURL => {
              console.log(`Envoyé - ${downloadURL}`);
              resolve(downloadURL);
           })
           .catch(error => {
             console.log(`Echec - ${error}`);
             reject();
           });
      }
    );
  }


}


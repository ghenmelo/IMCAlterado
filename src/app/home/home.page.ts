import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return this.height && this.weight && this.height > 0 && this.weight > 0;
  }

  onCalculateIMC() {
    const imc = this.weight / (this.height * this.height);
    let imcNivel = '';
    if (imc < 18.5) {
      imcNivel = 'Magreza';
    } else if (imc <= 24.9) {
      imcNivel = 'Normal';
    } else if (imc <= 29.9) {
      imcNivel = 'SobrePeso';
    } else if (imc <= 39.9) {
      imcNivel = 'Obesidade';
    } else {
      imcNivel = 'Obesidade Grave';
    }
    this.showMessage(`IMC = ${imc.toFixed(2)} - ${imcNivel}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'primary',
      buttons: [
        {
          icon: 'close',
        },
      ],
    });
    toast.present();
  }
}

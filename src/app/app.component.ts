import { Component } from '@angular/core';
import { PaletteNames } from '../lib/palettes';
import { ThemeFormType } from './footer-bar/footer-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  paletteName = PaletteNames;
  palette = this.paletteName[0];

  changeTheme = (ev: ThemeFormType) => {
    const { Palette, Dark } = ev;
    this.palette = Palette ? Palette : this.paletteName[0];
    const main = document.getElementById('main');
    if (main) {
      Dark ? main.classList.add('dark') : main.classList.remove('dark');
    }
  };
}

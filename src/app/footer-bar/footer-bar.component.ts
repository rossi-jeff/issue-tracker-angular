import { Component, EventEmitter, Output } from '@angular/core';
import { PaletteNames } from '../../lib/palettes';
import { FormControl, FormGroup } from '@angular/forms';

export type ThemeFormType = {
  Palette?: string | null;
  Dark?: boolean | null;
};

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.css'],
})
export class FooterBarComponent {
  @Output() changeTheme = new EventEmitter<ThemeFormType>();

  paletteNames = PaletteNames;
  palette = this.paletteNames[0];

  themeForm = new FormGroup({
    Palette: new FormControl(this.palette),
    Dark: new FormControl(false),
  });

  sendThemeChange = () => {
    this.changeTheme.emit(this.themeForm.value);
  };
}

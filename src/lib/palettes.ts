export type PaletteType = {
  [key: string]: {
    light: string;
    dark: string;
    altLight: string;
    altDark: string;
  };
};

// fom https://www.canva.com/colors/color-palettes/
export const palettes: PaletteType = {
  'Emerald-Entrance': {
    light: '#F4EBD0',
    dark: '#122620',
    altLight: '#D6AD60',
    altDark: '#B68D40',
  },
  'Warm-Sunset': {
    light: '#FDB750',
    dark: '#010100',
    altLight: '#FD7F20',
    altDark: '#FC2E20',
  },
  'Soft-Focus-Forest': {
    light: '#87ACA3',
    dark: '#0C1446',
    altLight: '#2B7C85',
    altDark: '#175873',
  },
  'Power-Up': {
    light: '#E9DDD4',
    dark: '#000000',
    altLight: '#E9DDD4',
    altDark: '#900020',
  },
  'Autumn-Crush': {
    light: '#EFCFA0',
    dark: '#532200',
    altLight: '#E1A140',
    altDark: '#914110',
  },
  /*
	'': {
		light: '',
		dark: '',
		altLight: '',
		altDark: ''
	}
	*/
};

export const PaletteNames = Object.keys(palettes);

export type Theme = 'dark' | 'light';

export interface IThemeContext {
  onChangeTheme: (theme: Theme) => void;
  theme: Theme;
  colors: ColorPalette;
}

export type ColorPalette = {
  PRIMARY: string;
  SECONDARY: string;
  RED: string;
  BLUE: string;
  TEXT: string;
  GREEN:string
  GREY:string
};

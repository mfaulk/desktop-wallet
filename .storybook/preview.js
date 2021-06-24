import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { I18nextProvider } from 'react-i18next';
import { withThemes } from '@react-theming/storybook-addon';

import i18n from '../app/i18n';
import { setTheme } from '../app/theme';
import GlobalStyles from '../app/components/GlobalStyles';
import {
  MOBILE_COIN_DARK,
  MOBILE_COIN_LIGHT,
  MOBILE_COIN_DARK_THEME,
  MOBILE_COIN_LIGHT_THEME,
} from '../app/constants/themes';

const providerFn = ({ theme, children }) => {
  const currentTheme = setTheme({
    responsiveFontSizes: true,
    theme: theme.name === 'MOBILE_COIN_LIGHT' ? MOBILE_COIN_LIGHT : MOBILE_COIN_DARK,
  });

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ThemeProvider>
    </div>
  );
};

export const onThemeSwitch = (context) => {
  const { theme } = context;
  const background = theme.name === 'MOBILE_COIN_LIGHT' ? '#FAFAFA' : '#2E313E';
  const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    backgrounds: {
      default: background,
    },
  };
  return {
    parameters,
  };
};

const themingDecorator = withThemes(null, [MOBILE_COIN_DARK_THEME, MOBILE_COIN_LIGHT_THEME], {
  providerFn,
  onThemeSwitch,
});

export const decorators = [themingDecorator];

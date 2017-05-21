export const colors = {
  primary: '#263238',
  secondary: '#1DE9B6',
};

export const styles = {
  borderRadius: '.28571429rem',
  breakPoints: {
    small: '40em',
    medium: '52em',
    large: '64em',
    xlarge: '76em',
  },
};

export function mediaQuery(size) {
  return `@media screen and (min-width: ${styles.breakPoints[size]}`;
}

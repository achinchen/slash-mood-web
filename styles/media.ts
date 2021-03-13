const breakpoints = {
  tablet: 600,
  landscape: 900,
  desktop: 1200,
  wide: 1600
};

const media = (device: keyof typeof breakpoints, styles: string): string =>
  `@media screen and (min-width: ${breakpoints[device]}px) { 
    ${styles}
  }`;

export default media;

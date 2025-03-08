import { css } from "styled-components";

interface Sizes {
  [key: string]: string;
}

export const sizes: Sizes = {
  sMobile: `480`,
  mobile: `768`,
  tablet: `980`,
  maxWidth: `1226`,
};

interface MediaFunc {
  [key: string]: (...args) => ReturnType<typeof css>;
}

// iterate through the sizes and create a media template
export const smallerThan: MediaFunc = Object.keys(sizes).reduce(
  (accumulator: MediaFunc, label: string) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize: number = parseInt(sizes[label]) / 16;
    const newAcc: MediaFunc = { ...accumulator };
    newAcc[label] = (...args): ReturnType<typeof css> => css`
      @media screen and (max-width: ${emSize}em) {
        ${css(args)}
      }
    `;

    return newAcc;
  },
  {}
);

export const largerThan: MediaFunc = Object.keys(sizes).reduce(
  (accumulator: MediaFunc, label: string) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize: number = parseInt(sizes[label]) / 16;
    const newAcc: MediaFunc = { ...accumulator };
    newAcc[label] = (...args: any[]): ReturnType<typeof css> => css`
      @media screen and (min-width: ${emSize}em) {
        ${css(args as any)}
      }
    `;

    return newAcc;
  },
  {}
);

export const smallerThanRes = (res: number) => {
  const emSize: number = res / 16;
  return (...args: any[]): ReturnType<typeof css> => css`
    @media screen and (max-width: ${emSize}em) {
      ${css(args as any)}
    }
  `;
};

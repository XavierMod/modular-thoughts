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

// Define the type for the media query function
interface MediaQueryFunction {
  (...args: Parameters<typeof css>): ReturnType<typeof css>;
}

interface MediaFunc {
  [key: string]: MediaQueryFunction;
}

// iterate through the sizes and create a media template
export const smallerThan: MediaFunc = Object.keys(sizes).reduce(
  (accumulator: MediaFunc, label: string) => {
    const emSize: number = parseInt(sizes[label]) / 16;
    const newAcc: MediaFunc = { ...accumulator };
    newAcc[label] = (
      ...args: Parameters<typeof css>
    ): ReturnType<typeof css> => css`
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
    const emSize: number = parseInt(sizes[label]) / 16;
    const newAcc: MediaFunc = { ...accumulator };
    newAcc[label] = (
      ...args: Parameters<typeof css>
    ): ReturnType<typeof css> => css`
      @media screen and (min-width: ${emSize}em) {
        ${css(args)}
      }
    `;
    return newAcc;
  },
  {}
);

export const smallerThanRes = (res: number) => {
  const emSize: number = res / 16;
  return (...args: Parameters<typeof css>): ReturnType<typeof css> => css`
    @media screen and (max-width: ${emSize}em) {
      ${css(args)}
    }
  `;
};

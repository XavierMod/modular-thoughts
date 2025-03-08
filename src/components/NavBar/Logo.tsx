import Image from "next/image";
import React from "react";
import modularThoughtsLogo from "@/images/logo-modular-thoughts.svg";

const Logo = () => {
  return (
    <Image
      src={modularThoughtsLogo}
      width={170}
      height={30}
      alt="Picture of the author"
    />
  );
};

export default Logo;

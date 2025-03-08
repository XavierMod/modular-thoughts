import Image from "next/image";
import React from "react";
import modularThoughtsLogo from "@/images/logo-modular-thoughts.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={modularThoughtsLogo}
        width={170}
        height={30}
        alt="Picture of the author"
      />
    </Link>
  );
};

export default Logo;

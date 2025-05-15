import React from "react";
import { LuBookOpenText } from "react-icons/lu";

const layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <LuBookOpenText
        fontSize={25}
        opacity={0.5}
        style={{ marginBottom: 10 }}
      />{" "}
      {props.children}
    </div>
  );
};

export default layout;

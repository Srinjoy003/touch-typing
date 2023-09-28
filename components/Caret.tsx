import { useState, useRef } from "react";

type CaretProp = { translateY: number; translateX: number; colour: string };

function Caret({ translateX, translateY, colour }: CaretProp) {

 

  const modifiedStyle = { transform: `translateX(${translateX}px) translateY(${translateY}px)` };
  const modifiedClass = `absolute border-[1.5px] h-7 transition-transform duration-200 animate-pulse ${colour}`;

  return <div className={modifiedClass} style={modifiedStyle}></div>;
}

export default Caret;

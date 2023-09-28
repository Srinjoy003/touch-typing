type CaretProp = {textRef ?: any; translateY ?: number; translateX ?: number; newLine ?: Array<number>; colour ?: string};
  

function Caret({ translateX, translateY}: CaretProp) {
    

    const modifiedStyle = {transform: `translateX(${translateX}px) translateY(${translateY}px)`,};

    const modifiedClass = "absolute border-[1.5px] h-6 border-arch-cursor transition-transform duration-200";

    return (
      <div className={modifiedClass} style={modifiedStyle}></div>
    );
}

export default Caret;

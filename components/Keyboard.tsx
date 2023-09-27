import MainKeyboard from "./MainKeyboard";
import { ArrowKeyPad, FunctionKeyPad, NumPad } from "./SmallKeySections";

type AddClassProp = { addClass?: string; theme: string; funcTheme: string; pressedTheme: string; backgroundTheme: string; textColour: string; textPressedColour: string };

function Keyboard({ addClass, theme, funcTheme, pressedTheme, backgroundTheme, textColour, textPressedColour }: AddClassProp) {
  const modifiedClass = `flex flex-col items-center mt-1 ml-0.5 bg-stone-200 h-9 ${addClass || ""}`.trim();
  const modifiedDivClass = `flex flex-row justify-center items-center w-[975px] gap-4 h-[240px] rounded-md  ${backgroundTheme}`;

  return (
    <div className={modifiedDivClass}>
      <MainKeyboard addClass="" theme={theme} funcTheme={funcTheme} pressedTheme={pressedTheme} textTheme={textColour} pressedTextTheme={textPressedColour}/>

      <div className="flex flex-col gap-10 ">
        <FunctionKeyPad addClass="" theme={theme} pressedTheme={pressedTheme} textTheme={textColour} pressedTextTheme={textPressedColour}/>
        <ArrowKeyPad addClass="" theme={theme} pressedTheme={pressedTheme} textTheme={textColour} pressedTextTheme={textPressedColour}/>
      </div>

      <NumPad addClass="" theme={theme} pressedTheme={pressedTheme} textTheme={textColour} pressedTextTheme={textPressedColour}/>
    </div>
  );
}

export default Keyboard;

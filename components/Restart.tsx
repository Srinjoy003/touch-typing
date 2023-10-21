import { VscDebugRestart } from "react-icons/vsc";

type RestartProps = {colour: string}
function Restart({colour}: RestartProps) {
	return (
		<div className={`absolute top-1/2 left-1/2 text-4xl ${colour}`}>
			<VscDebugRestart />
		</div>
	);
}

export default Restart;

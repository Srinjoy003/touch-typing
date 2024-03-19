import { RootState } from "../reduxStore/store";
import { useSelector } from "react-redux";

function Loading() {
	const theme = useSelector((state: RootState) => state.theme);

	return (
		<div className={`flex justify-center items-center h-full bg-${theme}-bg`}>
			<div
				className={`animate-spin rounded-full h-28 w-28 border-[10px] border-x-${theme}-main border-y-${theme}-bg`}
			></div>
		</div>
	);
}

export default Loading;

import { useCallback, useEffect, useRef } from "react";

type SelectorProp = { puncChangeFunc: any; numChangeFunc: any; puncState: boolean; capsChangeFunc: any; numState: boolean; capsState: boolean; borderColour: string; borderSelectColour: string; textColour: string; hoverColour: string; textSelectColour: string; svgColour: string; svgSelectColour: string; svgHoverColour: string };

function TextSelectorBar({ puncChangeFunc, numChangeFunc, capsChangeFunc, puncState, numState, capsState, borderColour, borderSelectColour, textColour, hoverColour, textSelectColour, svgColour, svgSelectColour, svgHoverColour }: SelectorProp) {
	const modifiedOuterDivClass = `flex flex-row justify-center gap-0 w-[500px] h-10 rounded-md opacity-100 transition-opacity duration-200 scale-75`;
	const modifiedInnerDivClass = `flex flex-row gap-2 h-full w-1/3 items-center justify-center group border-2 ${hoverColour} `;
	const firstClass = " rounded-l-lg";
	const lastClass = " rounded-r-lg";

	const puncDiv = `${puncState ? textSelectColour : textColour} ${puncState ? borderSelectColour : borderColour}`;
	const numDivColour = `${numState ? textSelectColour : textColour} ${numState ? borderSelectColour : borderColour}`;
	const capsDivColour = `${capsState ? textSelectColour : textColour} ${capsState ? borderSelectColour : borderColour}`;

	const puncSvgColour = `${puncState ? svgSelectColour : svgColour}`;
	const numSvgColour = `${numState ? svgSelectColour : svgColour}`;
	const capsSvgColour = `${capsState ? svgSelectColour : svgColour}`;

	const modifiedSvgClass = `${svgHoverColour} `;

	const textSelectorRef = useRef(null);

	const handleVisibility = useCallback((event: MouseEvent | KeyboardEvent) => {
		if (textSelectorRef.current) {
			const textSelectorDiv = textSelectorRef.current as HTMLDivElement;

			if (event.type === "keydown") {
				textSelectorDiv.classList.add("opacity-0");
				textSelectorDiv.classList.remove("opacity-100");
			} else if (event.type === "mousemove") {
				textSelectorDiv.classList.add("opacity-100");
				textSelectorDiv.classList.remove("opacity-0");
			}
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", handleVisibility);
		document.addEventListener("mousemove", handleVisibility);

		return () => {
			document.removeEventListener("keydown", handleVisibility);
			document.addEventListener("mousemove", handleVisibility);
		};
	}, [handleVisibility]);

	return (
		<div ref={textSelectorRef} className={modifiedOuterDivClass}>
			<div className={modifiedInnerDivClass + puncDiv + firstClass} onClick={puncChangeFunc}>
				<svg className={modifiedSvgClass + puncSvgColour} width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.199 0-.387-.038-.562-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.504 1.504 0 0 1 .765-.787c.176-.077.362-.115.558-.115H14v-.984h-.09c-.195 0-.38-.04-.556-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.414 1.414 0 0 1-.307-.465l-.001-.002a1.405 1.405 0 0 1-.117-.566c0-.29.006-.58.018-.869a6.19 6.19 0 0 0-.024-.87v-.001a3.542 3.542 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.33 2.33 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .386.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.282 2.282 0 0 0 .738.955 2.282 2.282 0 0 0-.738.955 2.7 2.7 0 0 0-.168.602c-.033.21-.051.423-.055.64-.008.22-.008.442 0 .666.008.224.012.45.012.678a1.47 1.47 0 0 1-.42 1.035 1.466 1.466 0 0 1-.457.319 1.33 1.33 0 0 1-.563.121H10z"
					/>
				</svg>

				<button className="outline-none">punctuation</button>
			</div>
			<div className={modifiedInnerDivClass + numDivColour} onClick={numChangeFunc}>
				<svg className={modifiedSvgClass + numSvgColour} width="20px" height="20px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
					<path d="M 8.7461 37.7031 L 15.8945 37.7031 L 13.7617 48.2969 C 13.7148 48.5312 13.6914 48.8125 13.6914 49.0469 C 13.6914 50.1953 14.4883 50.8281 15.5898 50.8281 C 16.7148 50.8281 17.5351 50.2187 17.7695 49.0703 L 20.0664 37.7031 L 31.1524 37.7031 L 29.0195 48.2969 C 28.9492 48.5312 28.9258 48.8125 28.9258 49.0469 C 28.9258 50.1953 29.7227 50.8281 30.8476 50.8281 C 31.9727 50.8281 32.7929 50.2187 33.0273 49.0703 L 35.3008 37.7031 L 43.6680 37.7031 C 44.9570 37.7031 45.8476 36.7656 45.8476 35.5 C 45.8476 34.4687 45.1445 33.6250 44.0898 33.6250 L 36.1445 33.6250 L 38.6289 21.25 L 46.8320 21.25 C 48.1211 21.25 49.0117 20.3125 49.0117 19.0468 C 49.0117 18.0156 48.3086 17.1719 47.2539 17.1719 L 39.4492 17.1719 L 41.3711 7.7265 C 41.3945 7.5859 41.4414 7.2812 41.4414 6.9766 C 41.4414 5.8281 40.6211 5.1719 39.4961 5.1719 C 38.1836 5.1719 37.5976 5.8984 37.3633 7.0000 L 35.3008 17.1719 L 24.2148 17.1719 L 26.1367 7.7265 C 26.1602 7.5859 26.2070 7.2812 26.2070 6.9766 C 26.2070 5.8281 25.3633 5.1719 24.2617 5.1719 C 22.9258 5.1719 22.3164 5.8984 22.1055 7.0000 L 20.0429 17.1719 L 12.3555 17.1719 C 11.0664 17.1719 10.1758 18.1563 10.1758 19.4453 C 10.1758 20.5 10.8789 21.25 11.9336 21.25 L 19.2227 21.25 L 16.7383 33.6250 L 9.1680 33.6250 C 7.8789 33.6250 6.9883 34.6094 6.9883 35.8984 C 6.9883 36.9531 7.6914 37.7031 8.7461 37.7031 Z M 20.8867 33.6250 L 23.3945 21.25 L 34.4805 21.25 L 31.9727 33.6250 Z" />
				</svg>
				<button className="outline-none">numbers</button>
			</div>
			<div className={modifiedInnerDivClass + capsDivColour + lastClass} onClick={capsChangeFunc}>
				<svg className={modifiedSvgClass + capsSvgColour} width="20px" height="20px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
					<path d="M25,12H20v2h5a1.0008,1.0008,0,0,1,1,1v2H22a3.0033,3.0033,0,0,0-3,3v1a3.0033,3.0033,0,0,0,3,3h6V15A3.0033,3.0033,0,0,0,25,12ZM22,22a1.0008,1.0008,0,0,1-1-1V20a1.0008,1.0008,0,0,1,1-1h4v3Z" />
					<path d="M16,24h2L12,7H10L4,24H6l1.6936-5h6.6135ZM8.3711,17l2.4966-7.3711.2668.0005L13.63,17Z" />
					<rect className="fill-none" id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" width="32" height="32" />
				</svg>
				<button className="outline-none">caps</button>
			</div>
		</div>
	);
}

export default TextSelectorBar;

/**
 * TODO: add description
 */
export interface DebugParams {
	componentName: string;
	type: 'class' | 'component';
	state: { [key: string]: any };
}
/**
 * TODO: add comment and description
 * @param debugParams
 * @returns
 */
export function useDebugComponent(debugParams: DebugParams) {
	// NOTE:
	const { componentName, type, state } = debugParams;

	const showStateUse = () => {
		console.groupCollapsed(
			componentName.toLocaleUpperCase().concat(`: ${type}`)
		);
		console.group(`state`, { ...state });
		console.groupEnd();
		console.groupEnd();
	};

	return { showStateUse };
}

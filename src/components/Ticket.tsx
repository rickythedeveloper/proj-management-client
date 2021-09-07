import React, { CSSProperties } from 'react';

interface Props {
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE = {};

export default class Ticket extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render(): JSX.Element {
		const { style: additionalStyle } = this.props;
		const containerStyle: CSSProperties = {
			...additionalStyle,
		};
		return (
			<div style={containerStyle}>Hello</div>
		);
	}
}

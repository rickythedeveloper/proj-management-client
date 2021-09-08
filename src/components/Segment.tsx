import React, { CSSProperties } from 'react';
import Ticket, { TicketCardData } from './Ticket';
import './Segment.css';

export interface SegmentData {
	name: string;
	tickets: TicketCardData[];
}

interface Props {
	data: SegmentData;
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE = {};

const BACKGROUND_COLOR = '#cccc';
const TITLE_HEIGHT = 50;
const TITLE_FONT_SIZE = 20;
const GAP = 10;

const styles: {[compoennt: string]: CSSProperties} = {
	container: {
		position: 'relative',
		borderRadius: 10,
		border: `2px solid ${BACKGROUND_COLOR}`,
		backgroundColor: BACKGROUND_COLOR,
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
	},
	title: {
		height: TITLE_HEIGHT,
		zIndex: 2,
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontSize: TITLE_FONT_SIZE,
	},
	ticketsSection: {
		zIndex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: GAP,
		overflowY: 'auto',
		overflowX: 'hidden',
		// scrollbarWidth: 0,
		padding: GAP,
	},
};

export default class Segment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render(): JSX.Element {
		const { style: additionalStyle, data } = this.props;

		return (
			<div className="segment" style={{ ...styles.container, ...additionalStyle }}>
				<div className="segment-title" style={styles.title}>
					{data.name}
				</div>
				<div className="segment-tickets" style={styles.ticketsSection}>
					{data.tickets.map((ticket) => (
						<Ticket key={ticket.id} data={ticket} />
					))}
				</div>
			</div>
		);
	}
}

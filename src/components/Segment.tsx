import React, { CSSProperties } from 'react';
import Ticket, { TicketCardData } from './Ticket';
import './Segment.css';

export interface SegmentData {
	name: string;
	tickets: TicketCardData[];
	spacingBeforeIndex?: number;
}

interface Props {
	data: SegmentData;
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE: State = {};

const BACKGROUND_COLOR = '#cccc';
const TITLE_HEIGHT = 50;
const TITLE_FONT_SIZE = 20;
const GAP = 10;
const EMPTY_SPACING_HEIHT = 100;

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
		padding: GAP,
		transition: 'all 1s',
	},
	emptySpacing: { height: EMPTY_SPACING_HEIHT, width: 100, backgroundColor: 'red' },
};

export default class Segment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render(): JSX.Element {
		const { style: additionalStyle, data } = this.props;

		const ticketElements = data.tickets.map((ticket, index) => (
			<Ticket
				key={ticket.id}
				data={ticket}
				style={{
					marginTop: index === data.spacingBeforeIndex ? 50 : undefined,
					transition: 'margin-top 0.3s',
				}}
			/>
		));

		return (
			<div className="segment" style={{ ...styles.container, ...additionalStyle }}>
				<div className="segment-title" style={styles.title}>
					{data.name}
				</div>
				<div className="segment-tickets" style={styles.ticketsSection}>
					{ticketElements}
				</div>
			</div>
		);
	}
}

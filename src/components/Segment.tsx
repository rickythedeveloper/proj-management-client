import React, { CSSProperties, DragEvent } from 'react';
import Ticket, { TicketCardData } from './Ticket';
import './Segment.css';

export interface SegmentData {
	name: string;
	tickets: TicketCardData[];
}

interface Props {
	data: SegmentData;
	onCardDragStart: (e: DragEvent<HTMLDivElement>, ticketData: TicketCardData) => void;
	onDragOver: (e: DragEvent<HTMLDivElement>) => void;
	onDrop: (e: DragEvent<HTMLDivElement>, dropIndex: number | undefined) => void;
	spacingIndex: number | undefined;
	setSpacingIndex: (index: number | undefined) => void;
	style?: CSSProperties;
}
interface State {
}
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
		flex: `0 0 ${TITLE_HEIGHT}px`,
		zIndex: 2,
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontSize: TITLE_FONT_SIZE,
	},
	ticketsSection: {
		flex: '1 1 auto',
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

const getClosestIndex = (e: DragEvent<HTMLDivElement>, ticketRefs: React.RefObject<HTMLDivElement>[]): number | undefined => {
	const { clientY } = e;
	let closestIndex: number | undefined;
	let closestDistance = Infinity;
	for (let i = 0; i < ticketRefs.length; i++) {
		const ticketRef = ticketRefs[i];
		if (ticketRef.current === null) continue;
		const { y } = ticketRef.current?.getBoundingClientRect();
		const distance = Math.abs(clientY - y);
		if (distance < closestDistance) {
			closestIndex = i;
			closestDistance = distance;
		}
	}
	return closestIndex;
};

export default class Segment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	onDragOver(e: DragEvent<HTMLDivElement>, ticketRefs: React.RefObject<HTMLDivElement>[]): void {
		const { spacingIndex: spacingBeforeIndex, setSpacingIndex } = this.props;
		const closestIndex = getClosestIndex(e, ticketRefs);
		if (closestIndex !== spacingBeforeIndex) setSpacingIndex(closestIndex);
	}

	render(): JSX.Element {
		const { style: additionalStyle, data, onCardDragStart, onDragOver, onDrop } = this.props;
		const { spacingIndex: spacingBeforeIndex } = this.props;

		const ticketRefs: React.RefObject<HTMLDivElement>[] = [];
		const ticketElements = data.tickets.map((ticket, index) => {
			const ticketRef = React.createRef<HTMLDivElement>();
			ticketRefs.push(ticketRef);
			return (
				<div ref={ticketRef} key={ticket.id} className="ticket-wrapper">
					<Ticket
						key={ticket.id}
						data={ticket}
						onDragStart={(e) => {
							onCardDragStart(e, ticket);
						}}
						style={{
							marginTop: index === spacingBeforeIndex ? 50 : undefined,
							transition: 'margin-top 0.3s',
						}}
					/>
				</div>
			);
		});

		return (
			<div
				className="segment"
				style={{ ...styles.container, ...additionalStyle }}
				onDragOver={(e) => {
					this.onDragOver(e, ticketRefs);
					onDragOver(e);
					e.preventDefault(); // This allows the firing of onDrop
				}}
				onDrop={(e) => {
					const dropIndex = getClosestIndex(e, ticketRefs);
					onDrop(e, dropIndex);
				}}
			>
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

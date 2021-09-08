import React, { CSSProperties, useState } from 'react';
import './App.css';
import Segment, { SegmentData } from './components/Segment';
import { TicketCardData } from './components/Ticket';

const randomTicket = (): TicketCardData => ({
	id: `TUN-${Math.round(Math.random() * 500)}`,
	categories: [
		{ name: 'feature', color: '#f00' },
		{ name: 'b', color: '#0f0' },
		{ name: 'c', color: '#00f' },
	],
	title: 'Fix the bug where the audio playback suddently stops',
	urgency: 0.4,
	assignees: [{ initials: 'RK', color: '#345' }, { initials: 'RK', color: '#f58' }],
});

const tickets: TicketCardData[] = [];
const tickets2: TicketCardData[] = [];
for (let i = 0; i < 10; i++) {
	tickets.push(randomTicket());
	tickets2.push(randomTicket());
}
const segment1 = { name: 'In Progress', tickets };
const segment2 = { name: 'Done', tickets: tickets2 };
const segments = [segment1, segment2];

const PADDING = 10;
const styles: {[component: string]: CSSProperties} = {
	app: { position: 'relative', width: '100%', height: '100%' },
	segmentsContainer: {
		position: 'absolute',
		top: PADDING,
		bottom: PADDING,
		left: PADDING,
		right: PADDING,
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		overflow: 'hidden',
	},
	segment: { width: 300 },
};

function App(): JSX.Element {
	const [draggedCard, setDraggedCard] = useState<TicketCardData>();
	const [segmentIndexDragFrom, setSegmentIndexDragFrom] = useState<number>();
	const [segmentIndexDragOver, setSegmentIndexDragOver] = useState<number>();
	const [spacingIndex, setSpacingIndex] = useState<number>();

	return (
		<div className="App" style={styles.app}>
			<div
				className="segments-container"
				style={styles.segmentsContainer}
			>
				{segments.map((segment, segmentIndex) => (
					<Segment
						style={styles.segment}
						data={segment}
						onCardDragStart={(e, ticketData) => {
							setDraggedCard(ticketData);
							setSegmentIndexDragFrom(segmentIndex);
						}}
						onDragOver={(e) => {
							// TODO: Set other segments' spacing index to undefined
						}}
						onDrop={(e, dropIndex) => {
							// TODO: for the current update index thing, just insert the card
							setSegmentIndexDragOver(undefined);
							setSpacingIndex(undefined);
						}}
						spacingIndex={segmentIndex === segmentIndexDragOver ? spacingIndex : undefined}
						setSpacingIndex={(index) => {
							setSegmentIndexDragOver(segmentIndex);
							setSpacingIndex(index);
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default App;

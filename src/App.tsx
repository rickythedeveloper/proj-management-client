import React, { CSSProperties, useState } from 'react';
import './App.css';
import Segment from './components/Segment';
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
for (let i = 0; i < 10; i++) {
	tickets.push(randomTicket());
}

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

	return (
		<div className="App" style={styles.app}>
			<div
				className="segments-container"
				style={styles.segmentsContainer}
			>
				<Segment
					style={styles.segment}
					data={{ name: 'In Progress', tickets }}
					onCardDragStart={(e, ticketData) => {
						setDraggedCard(ticketData);
					}}
					onDragOver={(e) => {
						// TODO: Set other segments' spacing index to undefined
					}}
					onDrop={(e) => {
						// TODO: for the current update index thing, just insert the card
					}}
				/>
				<Segment
					style={styles.segment}
					data={{ name: 'In Progress', tickets }}
					onCardDragStart={(e, ticketData) => {
						setDraggedCard(ticketData);
					}}
					onDragOver={(e) => {
						// TODO: Set other segments' spacing index to undefined
					}}
					onDrop={(e) => {
						// TODO: for the current update index thing, just insert the card
					}}
				/>
			</div>
		</div>
	);
}

export default App;

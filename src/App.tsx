import React, { CSSProperties } from 'react';
import './App.css';
import Segment from './components/Segment';
import Ticket, { TicketCardData } from './components/Ticket';

const ticket1 = {
	id: 'TUN-75',
	categories: [
		{ name: 'feature', color: '#f00' },
		{ name: 'b', color: '#0f0' },
		{ name: 'c', color: '#00f' },
	],
	title: 'Fix the bug where the audio playback suddently stops',
	urgency: 0.4,
	assignees: [{ initials: 'RK', color: '#345' }, { initials: 'RK', color: '#f58' }],
};

const tickets = Array<TicketCardData>(10).fill(ticket1);

const styles: {[component: string]: CSSProperties} = {
	app: { width: '100%', height: '100%' },
	segmentsContainer: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'stretch',
		gap: 10,
		overflow: 'hidden',
	},
	segment: { width: 300 },
};

function App(): JSX.Element {
	return (
		<div className="App" style={styles.app}>
			<div
				className="segments-container"
				style={styles.segmentsContainer}
			>
				<Segment
					style={styles.segment}
					data={{ name: 'In Progress', tickets }}
				/>
				<Segment
					style={styles.segment}
					data={{ name: 'In Progress', tickets }}
				/>
				<Segment
					style={styles.segment}
					data={{ name: 'In Progress', tickets }}
				/>
			</div>
		</div>
	);
}

export default App;

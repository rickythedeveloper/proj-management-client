import React, { CSSProperties } from 'react';
import './App.css';
import { TicketCardData } from './components/Ticket';
import ProjectPage from './components/ProjectPage';

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
	},
};

function App(): JSX.Element {
	return (
		<div className="App" style={styles.app}>
			<ProjectPage project={{
				id: 19,
				name: 'another project',
				owner_user_id: 10,
			}}
			/>
			{/* <Pool style={styles.segmentsContainer} initialSegments={segments} /> */}
		</div>
	);
}

export default App;

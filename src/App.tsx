import React from 'react';
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

function App(): JSX.Element {
	const appStyle = { width: '100%', height: '100%' };
	return (
		<div className="App" style={appStyle}>
			<Ticket
				style={{ width: 250 }}
				data={{
					id: 'TUN_75',
					categories: [
						{ name: 'feature', color: '#f00' },
						{ name: 'b', color: '#0f0' },
						{ name: 'c', color: '#00f' },
					],
					title: 'Fix the bug where the audio playback suddently stops',
					urgency: 0.4,
					assignees: [{ initials: 'RK', color: '#345' }, { initials: 'RK', color: '#f58' }],
				}}
			/>
			<Segment
				style={{ width: 300, height: 500 }}
				data={{ name: 'In Progress', tickets }}
			/>
			Hello World!
		</div>
	);
}

export default App;

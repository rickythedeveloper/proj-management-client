import React from 'react';
import './App.css';
import Ticket from './components/Ticket';

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
			Hello World!
		</div>
	);
}

export default App;

import React from 'react';
import './App.css';
import Ticket from './components/Ticket';

function App(): JSX.Element {
	const appStyle = { width: '100%', height: '100%' };
	return (
		<div className="App" style={appStyle}>
			<Ticket style={{ width: 250 }} />
			Hello World!
		</div>
	);
}

export default App;

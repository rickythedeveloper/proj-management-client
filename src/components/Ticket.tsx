import React, { CSSProperties } from 'react';

interface Props {
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE = {};

interface Category {
	name: string;
	color: string;
}

interface Assignee {
	initials: string;
	color: string;
}

const TOP_SECTION_HEIGHT = 20;
const BOTTOM_SECTION_HEIGHT = 30;
const CATEGORY_HEIGHT = TOP_SECTION_HEIGHT * 1;
const GAP = 15;
const TITLE_FONT_SIZE = 20;
const ASSIGNEE_SIZE = BOTTOM_SECTION_HEIGHT * 1;

const styles: {[component: string]: CSSProperties} = {
	container: {
		backgroundColor: '#fff',
		borderRadius: 10,
		border: '1px solid #000',
		padding: GAP,
		width: 250,
	},
	content: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: GAP,
	},
	topSection: {
		height: TOP_SECTION_HEIGHT,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	id: {
		lineHeight: '100%',
		fontSize: CATEGORY_HEIGHT * 0.8,
		color: 'grey',
	},
	categoriesContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: GAP,
	},
	category: {
		height: CATEGORY_HEIGHT,
		width: CATEGORY_HEIGHT,
		borderRadius: CATEGORY_HEIGHT / 2,
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
		color: '#333',
	},
	bottomSection: {
		height: BOTTOM_SECTION_HEIGHT,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	urgency: {
		height: BOTTOM_SECTION_HEIGHT,
		width: BOTTOM_SECTION_HEIGHT,
		borderRadius: BOTTOM_SECTION_HEIGHT / 2,
	},
	assigneeCircle: {
		color: 'white', // TODO: workout the best text color
		height: ASSIGNEE_SIZE,
		width: ASSIGNEE_SIZE,
		borderRadius: ASSIGNEE_SIZE / 2,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	assigneeName: { fontSize: ASSIGNEE_SIZE / 2 },
};

export default class Ticket extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render(): JSX.Element {
		const { style: additionalStyle } = this.props;
		const id = 'TUN-75';
		const categories: Category[] = [
			{ name: 'a', color: '#f00' },
			{ name: 'b', color: '#0f0' },
			{ name: 'c', color: '#00f' },
		];
		const title = 'Fix the bug where the audio playback suddently stops';
		const urgency = 0.4; // between 0 and 1
		const assignee: Assignee = { initials: 'RK', color: '#345' };

		const urgencyColor = `rgb(${255 * 2 * urgency}, ${255 * 2 * (1 - urgency)}, 0)`;

		return (
			<div
				className="ticket"
				style={{ ...styles.container, ...additionalStyle }}
			>
				<div className="ticket-content" style={styles.content}>
					<div className="ticket-top-section" style={styles.topSection}>
						<div className="ticket-id" style={styles.id}>{id}</div>
						<div className="ticket-categories" style={styles.categoriesContainer}>
							{categories.map((category) => (
								<div
									key={category.name}
									className="ticket-category"
									style={{ ...styles.category, backgroundColor: category.color }}
								/>
							))}
						</div>
					</div>

					<div className="ticket-title" style={styles.title}>
						{title}
					</div>

					<div className="ticket-bottom-section" style={styles.bottomSection}>
						<div>6 likes</div>
						<div>6 comments</div>
						<div className="ticket-urgency" style={{ ...styles.urgency, backgroundColor: urgencyColor }} />
						<div
							className="ticket-assignee"
							style={{ ...styles.assigneeCircle, backgroundColor: assignee.color }}
						>
							<div className="ticket-assignee-initial" style={styles.assigneeName}>
								{assignee.initials}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

import React, { CSSProperties, DragEvent, LegacyRef } from 'react';

export interface TicketCardData {
	id: string;
	categories: Category[];
	title: string;
	urgency: number; // between 0 and 1
	assignees: Assignee[];
}

interface Props {
	data: TicketCardData;
	onDragStart: (e: DragEvent<HTMLDivElement>) => void;
	style?: CSSProperties;
}
interface State {
	showsCategoryNames: boolean;
}
const DEFAULT_STATE: State = { showsCategoryNames: false };

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
		backgroundColor: '#fffa',
		borderRadius: 10,
		border: '1px solid #000',
		padding: GAP,
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
		transition: 'all 1s',
		height: CATEGORY_HEIGHT,
		borderRadius: CATEGORY_HEIGHT / 2,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
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
	assigneesContainer: {
		display: 'flex',
		flexDirection: 'row',
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
		const { style: additionalStyle, data, onDragStart } = this.props;
		const { showsCategoryNames } = this.state;
		const urgencyColor = `rgb(${255 * 2 * data.urgency}, ${255 * 2 * (1 - data.urgency)}, 0)`;

		return (
			<div
				className="ticket"
				style={{ ...styles.container, ...additionalStyle }}
				draggable
				onDragStart={onDragStart}
			>
				<div className="ticket-content" style={styles.content}>
					<div className="ticket-top-section" style={styles.topSection}>
						<div className="ticket-id" style={styles.id}>{data.id}</div>
						<div className="ticket-categories" style={styles.categoriesContainer}>
							{/* eslint-disable jsx-a11y/click-events-have-key-events */}
							{/* eslint-disable jsx-a11y/no-static-element-interactions */}
							{data.categories.map((category) => (
								<div
									key={category.name}
									className="ticket-category"
									style={{
										...styles.category,
										backgroundColor: category.color,
										width: showsCategoryNames ? undefined : CATEGORY_HEIGHT + 20,
										paddingLeft: showsCategoryNames ? CATEGORY_HEIGHT / 2 : undefined,
										paddingRight: showsCategoryNames ? CATEGORY_HEIGHT / 2 : undefined,
									}}
									onClick={() => { this.setState((prev) => ({ showsCategoryNames: !prev.showsCategoryNames })); }}
								>
									{showsCategoryNames && category.name}
								</div>
							))}
						</div>
						{/* eslint-enable jsx-a11y/click-events-have-key-events */}
						{/* eslint-enable jsx-a11y/no-static-element-interactions */}
					</div>

					<div className="ticket-title" style={styles.title}>
						{data.title}
					</div>

					<div className="ticket-bottom-section" style={styles.bottomSection}>
						<div>6 l</div>
						<div>6 c</div>
						<div className="ticket-urgency" style={{ ...styles.urgency, backgroundColor: urgencyColor }} />
						<div className="ticket-assignees-container" style={styles.assigneesContainer}>
							{data.assignees.map((assignee) => (
								<div
									key={`${assignee.initials}${assignee.color}`}
									className="ticket-assignee"
									style={{ ...styles.assigneeCircle, backgroundColor: assignee.color }}
								>
									<div className="ticket-assignee-initial" style={styles.assigneeName}>
										{assignee.initials}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

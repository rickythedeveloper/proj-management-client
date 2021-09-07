import React, { CSSProperties } from 'react';

interface Props {
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE = {
};

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

export default class Ticket extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render(): JSX.Element {
		const { style: additionalStyle } = this.props;
		const id = 'TUN-75';
		const categories: Category[] = [
			{
				name: 'a', color: '#f00',
			}, {
				name: 'a', color: '#0f0',
			}, {
				name: 'a', color: '#00f',
			},
		];
		const title = 'Fix the bug where the audio playback suddently stops';
		const urgency = 0.4; // between 0 and 1
		const assignee: Assignee = {
			initials: 'RK', color: '#345',
		};
		const containerStyle: CSSProperties = {
			backgroundColor: '#fff',
			borderRadius: 10,
			border: '1px solid #000',
			padding: GAP,
			width: 250,
			...additionalStyle,
		};
		const contentStyle: CSSProperties = {
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			gap: GAP,
		};
		const topSectionStyle: CSSProperties = {
			height: TOP_SECTION_HEIGHT,
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		};
		const idStyle: CSSProperties = {
			lineHeight: '100%',
			fontSize: CATEGORY_HEIGHT * 0.8,
			color: 'grey',
		};
		const categoriesStyle: CSSProperties = {
			display: 'flex',
			flexDirection: 'row',
			gap: GAP,
		};
		const categoryStyle: CSSProperties = {
			height: CATEGORY_HEIGHT,
			width: CATEGORY_HEIGHT,
			borderRadius: CATEGORY_HEIGHT / 2,
		};
		const titleStyle: CSSProperties = {
			fontSize: TITLE_FONT_SIZE,
			color: '#333',
		};
		const bottomSectionStyle: CSSProperties = {
			height: BOTTOM_SECTION_HEIGHT,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		};
		const urgencyStyle: CSSProperties = {
			height: BOTTOM_SECTION_HEIGHT,
			width: BOTTOM_SECTION_HEIGHT,
			borderRadius: BOTTOM_SECTION_HEIGHT / 2,
			backgroundColor: `rgb(${255 * 2 * urgency}, ${255 * 2 * (1 - urgency)}, 0)`,
		};
		const assigneeStyle: CSSProperties = {
			backgroundColor: assignee.color,
			color: 'white', // TODO: workout the best text color
			height: ASSIGNEE_SIZE,
			width: ASSIGNEE_SIZE,
			borderRadius: ASSIGNEE_SIZE / 2,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		};
		const assigneeInitialStyle: CSSProperties = {
			fontSize: ASSIGNEE_SIZE / 2,
		};

		const categoryElements = categories.map((category) => (
			<div
				className="ticket-category"
				style={{
					...categoryStyle, backgroundColor: category.color,
				}}
			/>
		));
		return (
			<div className="ticket" style={containerStyle}>
				<div className="ticket-content" style={contentStyle}>
					<div className="ticket-top-section" style={topSectionStyle}>
						<div className="ticket-id" style={idStyle}>{id}</div>
						<div className="ticket-categories" style={categoriesStyle}>
							{categoryElements}
						</div>
					</div>

					<div className="ticket-title" style={titleStyle}>
						{title}
					</div>

					<div className="ticket-bottom-section" style={bottomSectionStyle}>
						<div>6 likes</div>
						<div>6 comments</div>
						<div className="ticket-urgency" style={urgencyStyle} />
						<div className="ticket-assignee" style={assigneeStyle}>
							<div className="ticket-assignee-initial" style={assigneeInitialStyle}>
								{assignee.initials}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

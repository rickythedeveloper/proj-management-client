import React, { CSSProperties } from 'react';
import Segment, { SegmentData } from './Segment';
import { TicketCardData } from './Ticket';

interface Props {
	initialSegments: SegmentData[];
	style?: CSSProperties;
}

interface State {
	segments: SegmentData[];
	draggedCard?: TicketCardData;
	segmentIndexDragFrom?: number;
	segmentIndexDragOver?: number;
	spacingIndex?: number;
}

const styles: {[component: string]: React.CSSProperties} = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		overflow: 'hidden',
	},
	segment: {
		width: 300,
	},
};

export default class Pool extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { segments: props.initialSegments };
	}

	render(): JSX.Element {
		const { style: additionalStyle } = this.props;
		const { segmentIndexDragOver, spacingIndex, segments, segmentIndexDragFrom, draggedCard } = this.state;
		return (
			<div className="segments-pool" style={{ ...styles.container, ...additionalStyle }}>
				{segments.map((segment, segmentIndex) => (
					<Segment
						key={segment.name}
						style={styles.segment}
						data={segment}
						onCardDragStart={(e, ticketData) => {
							this.setState({
								draggedCard: ticketData,
								segmentIndexDragFrom: segmentIndex,
							});
						}}
						onDragOver={(e) => {
							// TODO: Set other segments' spacing index to undefined
						}}
						onDrop={(e, dropIndex) => {
							if (segmentIndexDragFrom !== undefined && draggedCard !== undefined && dropIndex !== undefined) {
								const segmentDragFrom = segments[segmentIndexDragFrom];

								// Remove the original ticket from the source segment
								const originalIndex = segmentDragFrom.tickets.indexOf(draggedCard);
								segmentDragFrom.tickets.splice(originalIndex, 1);
								segments[segmentIndexDragFrom] = segmentDragFrom;

								// Add the ticket to the target segment
								const insertaionIndex = (segmentIndexDragFrom === segmentIndex && dropIndex > originalIndex)
									? dropIndex - 1
									: dropIndex;
								const currentTicketsDestination = segments[segmentIndex].tickets;
								segments[segmentIndex].tickets = [
									...currentTicketsDestination.slice(0, insertaionIndex),
									draggedCard,
									...currentTicketsDestination.slice(insertaionIndex),
								];
							}
							this.setState({
								segmentIndexDragOver: undefined,
								spacingIndex: undefined,
							});
						}}
						spacingIndex={segmentIndex === segmentIndexDragOver ? spacingIndex : undefined}
						setSpacingIndex={(index) => {
							this.setState({
								segmentIndexDragOver: segmentIndex,
								spacingIndex: index,
							});
						}}
					/>
				))}
			</div>
		);
	}
}

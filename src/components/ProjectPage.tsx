import React, { CSSProperties } from 'react';
import { getAllMetrics as getMetrics, getMetricOptions, getTickets } from '../requests';
import { Metric, MetricOption, Project, Ticket } from '../models/structure';

interface Props {
	project: Project;
	style?: CSSProperties;
}
interface State {
	metrics: Metric[];
	metricOptions: MetricOption[];
	tickets: Ticket[];
}
const DEFAULT_STATE: State = {
	metrics: [],
	metricOptions: [],
	tickets: [],
};

const styles: {[component: string]: React.CSSProperties} = {
	container: {},
};
export default class ProjectPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	componentDidMount(): void {
		getMetrics(this.props.project.id)
			.then((metrics) => {
				this.setState({ metrics });

				metrics.forEach((metric) => {
					getMetricOptions(metric.id)
						.then((metricOptions) => this.setState((prev) => ({ metricOptions: prev.metricOptions.concat(metricOptions) })))
						.catch((error) => console.log(error));
				});
			})
			.catch((error) => console.log(error));

		getTickets(this.props.project.id)
			.then((tickets) => {
				this.setState({ tickets });
			})
			.catch((error) => console.log(error));
	}

	render(): JSX.Element {
		const { style: additionalStyle } = this.props;
		return (
			<div style={{ ...styles.container, ...additionalStyle }}>
				{this.state.metrics.map((metric) => metric.title)}
				{this.state.metricOptions.map((option) => option.option_string + option.metric_id)}
				{this.state.tickets.map((ticket) => ticket.title)}
			</div>
		);
	}
}

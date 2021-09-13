import axios from 'axios';
import { Project, Metric, MetricOption, Ticket } from '../models/structure';
import { GetResponse } from '../models/api';

const userID = 8; // TODO store user details somewhere else
const urlRoot = 'http://localhost:8000';

export const getAllProjects = async (): Promise<Project[]> => {
	try {
		const results = await axios.get<GetResponse<Project[]>>(`${urlRoot}/projects`);
		if (results.data.isSuccessful) {
			const projects = results.data.result;
			return projects;
		}
		throw new Error('Projects could not be retrieved');
	} catch (error) {
		throw new Error(String(error));
	}
};

export const getAllMetrics = async (projectID: number): Promise<Metric[]> => {
	try {
		const results = await axios.get<GetResponse<Metric[]>>(`${urlRoot}/metrics?project_id=${projectID}`);
		if (results.data.isSuccessful) {
			const metrics = results.data.result;
			return metrics;
		}
		throw new Error('Metrics could not be retrieved');
	} catch (error) {
		throw new Error(String(error));
	}
};

export const getMetricOptions = async (metricID: number): Promise<MetricOption[]> => {
	try {
		const results = await axios.get<GetResponse<MetricOption[]>>(`${urlRoot}/metric-options?metric_id=${metricID}`);
		if (results.data.isSuccessful) {
			return results.data.result;
		}
		throw new Error('Metric options could not be retrieved');
	} catch (error) {
		throw new Error(String(error));
	}
};

export const getTickets = async (projectID: number): Promise<Ticket[]> => {
	try {
		const results = await axios.get<GetResponse<Ticket[]>>(`${urlRoot}/tickets?project_id=${projectID}`);
		if (results.data.isSuccessful) {
			return results.data.result;
		}
		throw new Error('Tickets could not be retrieved');
	} catch (error) {
		throw new Error(String(error));
	}
};

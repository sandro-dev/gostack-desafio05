import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: 0,
	};

	componentDidMount() {}

	componentDidUpdate() {}

	handleInput = e => {
		this.setState({
			newRepo: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { repositories, newRepo } = this.state;

		this.setState({ loading: 1 });

		try {
			const response = await api.get(`/repos/${newRepo}`);
			console.log(response.data);

			this.setState({
				repositories: [...repositories, response.data.full_name],
				newRepo: '',
			});
		} catch (error) {
			console.log(error);
		}
		this.setState({ loading: 0 });
	};

	render() {
		const { newRepo, repositories, loading } = this.state;
		return (
			<Container>
				<h1>
					<FaGithubAlt />
					Repositories
				</h1>
				<Form onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Adicionar repositório"
						onChange={this.handleInput}
						value={newRepo}
					/>
					<SubmitButton loading={loading}>
						{loading ? (
							<FaSpinner color="#fff" size={14} />
						) : (
							<FaPlus color="#fff" size={14} />
						)}
					</SubmitButton>
				</Form>
				<List>
					{repositories.map(repository => (
						<li key={repository}>{repository}</li>
					))}
				</List>
			</Container>
		);
	}
}

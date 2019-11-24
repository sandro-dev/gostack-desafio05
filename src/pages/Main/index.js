import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';

import { Form, SubmitButton, List, Input } from './styles';

import api from '../../services/api';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: 0,
		error: false,
	};

	componentDidMount() {
		const repositories = window.localStorage.getItem('repositories');
		console.log(repositories);

		if (repositories) {
			this.setState({
				repositories: JSON.parse(repositories),
			});
		}
	}

	componentDidUpdate(_, prevState) {
		const { repositories } = this.state;
		if (prevState.repositories !== repositories) {
			window.localStorage.setItem('repositories', JSON.stringify(repositories));
		}
	}

	handleInput = e => {
		this.setState({
			newRepo: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { repositories, newRepo } = this.state;

		try {
			const verify = repositories.filter(repo => repo === newRepo);
			if (verify.length > 0) {
				throw new Error('Duplicate repository');
			}

			if (newRepo) {
				this.setState({ loading: 1 });
				const response = await api.get(`/repos/${newRepo}`);

				if (response.data) {
					this.setState({
						repositories: [...repositories, response.data.full_name],
						newRepo: '',
						error: false,
					});
				}
			}
		} catch (err) {
			this.setState({ error: true });
		}
		this.setState({ loading: 0 });
	};

	render() {
		const { newRepo, repositories, loading, error } = this.state;
		return (
			<Container>
				<h1>
					<FaGithubAlt />
					Repositories
				</h1>
				<Form onSubmit={this.handleSubmit}>
					<Input
						type="text"
						error={error}
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

import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Form, SubmitButton, List, Input } from './styles';

import api from '../../services/api';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: 0,
		error: false,
	};

	componentDidMount() {
		console.log('error: ', this.state.error);
	}

	componentDidUpdate() {
		console.log('#componentDidUpdate error: ', this.state.error);
	}

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

			if (response.data) {
				this.setState({
					repositories: [...repositories, response.data.full_name],
					newRepo: '',
					error: false,
				});
			}
		} catch (err) {
			console.log(err);
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

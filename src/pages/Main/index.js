import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdDescription, MdDelete } from 'react-icons/md';
import Container from '../../components/Container';

import { Form, SubmitButton, List, Input, ContainerIcons } from './styles';
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

	handleDelete = repo => {
		const { repositories } = this.state;
		this.setState({
			repositories: repositories.filter(r => r !== repo),
		});
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
						<li key={repository}>
							<Link to={`/repository/${encodeURIComponent(repository)}`}>
								{repository}
							</Link>

							<ContainerIcons>
								<Link to={`/repository/${encodeURIComponent(repository)}`}>
									<MdDescription
										color="#0984e3"
										title={`Ver repositório ${repository}`}
										size={32}
									/>
								</Link>
								<MdDelete
									color="#d63031"
									type="button"
									onClick={() => this.handleDelete(repository)}
									title={`Deletar repositório ${repository}`}
									size={32}
								/>
							</ContainerIcons>
						</li>
					))}
				</List>
			</Container>
		);
	}
}

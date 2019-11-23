import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: 0,
	};

	componentDidMount() {}

	componentDidUpdate() {}

	handleInput = e => {
		console.log(e.target.value);
		this.setState({
			newRepo: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { repositories, newRepo } = this.state;

		this.setState({ loading: 1 });

		this.setState({
			repositories: [...repositories, newRepo],
			newRepo: '',
		});
	};

	render() {
		const { newRepo } = this.state;
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
					<SubmitButton>
						<FaPlus color="#fff" size={14} />
					</SubmitButton>
				</Form>
				<List />
			</Container>
		);
	}
}

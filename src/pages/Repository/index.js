import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import Container from '../../components/Container';

import api from '../../services/api';

import { Loading, Owner, States, Issues, IssueDescription } from './styles';

export default class Repository extends Component {
	state = {
		repository: {},
		issues: [],
		loading: true,
		owner: {},
	};

	async componentDidMount() {
		const { match } = this.props;

		const repoName = decodeURIComponent(match.params.repository);
		console.log('repoName: ', repoName);

		const [repository, issues] = await Promise.all([
			api.get(`/repos/${repoName}`),
			api.get(`/repos/${repoName}/issues`, {
				params: {
					state: 'open',
					per_page: 5,
				},
			}),
		]);

		this.setState({
			repository: repository.data,
			issues: issues.data,
			owner: repository.data.owner,
			loading: false,
		});

		console.log('repository', repository.data);
		console.log('issues', issues.data);
	}

	handleTags = tag => {
		console.log(tag);
	};

	render() {
		const { repository, issues, owner, loading } = this.state;

		if (loading) {
			return <Loading>Carregando...</Loading>;
		}

		return (
			<Container>
				<Owner>
					<Link to="/">
						<IoMdArrowBack />
						voltar a página inicial
					</Link>
					<img src={owner.avatar_url} alt={owner.login} />
					<h1>{repository.full_name}</h1>
					<p>{repository.description}</p>
					<States>
						<button
							type="button"
							onClick={() => {
								this.handleTags('all');
							}}
						>
							All
						</button>
						<button
							type="button"
							onClick={() => {
								this.handleTags('opened');
							}}
						>
							Opened
						</button>
						<button
							type="button"
							onClick={() => {
								this.handleTags('closed');
							}}
						>
							Closed
						</button>
					</States>
				</Owner>
				<Issues>
					<h2>List of Issues</h2>
					{issues.map(issue => (
						<li key={issue.id}>
							<img src={issue.user.avatar_url} alt={repository.owner.login} />
							<IssueDescription>
								<a href={issue.html_url}>{issue.title}</a>
								<strong>{issue.user.login}</strong>
							</IssueDescription>
						</li>
					))}
				</Issues>
			</Container>
		);
	}
}

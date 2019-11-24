import React, { Component } from 'react';

import Container from '../../components/Container';

import api from '../../services/api';

import { Loading, Owner, Issues, IssueDescription } from './styles';

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
			api.get(`/repos/${repoName}/issues`),
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

	render() {
		const { repository, issues, owner, loading } = this.state;

		if (loading) {
			return <Loading>Carregando...</Loading>;
		}

		return (
			<Container>
				<Owner>
					<img src={owner.avatar_url} alt={owner.login} />
					<h1>{repository.full_name}</h1>
					<p>{repository.description}</p>
				</Owner>
				<Issues>
					{issues.map(issue => (
						<li key={issue.id}>
							<img src={issue.user.avatar_url} alt={repository.owner.login} />
							<IssueDescription>
								<h3>{issue.title}</h3>
								<span>{issue.user.login}</span>
							</IssueDescription>
						</li>
					))}
				</Issues>
			</Container>
		);
	}
}

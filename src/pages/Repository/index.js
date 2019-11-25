import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import Container from '../../components/Container';

import api from '../../services/api';

import {
	Loading,
	Owner,
	IssueStates,
	Issues,
	IssueDescription,
} from './styles';

export default class Repository extends Component {
	state = {
		repository: {},
		issues: [],
		loading: true,
		owner: {},
		issueState: '',
	};

	async componentDidMount() {
		this.handleGithubApi();
	}

	componentDidUpdate(_, prevState) {
		const { issueState } = this.state;
		if (prevState.issueState !== issueState) {
			this.handleGithubApi(issueState);
		}
	}

	handleGithubApi = async state => {
		const { match } = this.props;
		const { issueState } = this.state;
		const repoName = decodeURIComponent(match.params.repository);

		const [repository, issues] = await Promise.all([
			api.get(`/repos/${repoName}`),
			api.get(`/repos/${repoName}/issues`, {
				params: {
					state: issueState || 'open',
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
	};

	handleIssueState = issueState => {
		this.setState({ issueState });
	};

	render() {
		const { repository, issues, owner, loading, issueState } = this.state;

		if (loading) {
			return <Loading>Carregando...</Loading>;
		}

		return (
			<Container>
				<Owner>
					<Link to="/">
						<IoMdArrowBack />
						back to main page
					</Link>
					<img src={owner.avatar_url} alt={owner.login} />
					<h1>{repository.full_name}</h1>
					<p>{repository.description}</p>
					<IssueStates>
						<button type="button" onClick={() => this.handleIssueState('all')}>
							All
						</button>
						<button type="button" onClick={() => this.handleIssueState('open')}>
							Opened
						</button>
						<button
							type="button"
							onClick={() => this.handleIssueState('closed')}
						>
							Closed
						</button>
					</IssueStates>
				</Owner>
				<Issues>
					<h2>List of {issueState || 'open'} issues</h2>
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

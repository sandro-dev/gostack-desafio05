import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Container from '../../components/Container';

import api from '../../services/api';

import {
	Loading,
	Owner,
	IssueStates,
	Issues,
	IssueDescription,
	Pagination,
} from './styles';

export default class Repository extends Component {
	state = {
		repository: {},
		issues: [],
		loading: true,
		owner: {},
		issueState: '',
		disabled: true,
		page: 1,
		perPage: 5,
		pageCount: 0,
	};

	async componentDidMount() {
		this.handleGithubApi();
	}

	componentDidUpdate(_, prevState) {
		const { issueState, page } = this.state;

		// issueState = issueState || 'open';

		const tag = this.refs[issueState || 'open'];
		tag.focus();

		if (prevState.issueState !== issueState) {
			this.handleGithubApi();
		}
		if (prevState.page !== page) {
			this.handleGithubApi();
		}
	}

	handleGithubApi = async function() {
		const { match } = this.props;
		const { issueState, page, perPage } = this.state;

		const repoName = decodeURIComponent(match.params.repository);

		if (!issueState) {
			const [repository, issues] = await Promise.all([
				api.get(`/repos/${repoName}`),
				api.get(`/repos/${repoName}/issues`, {
					params: {
						state: 'open',
						per_page: perPage,
						page,
					},
				}),
			]);

			this.setState({
				repository: repository.data,
				issues: issues.data,
				owner: repository.data.owner,
				loading: false,
				pageCount: issues.data.length,
			});
		} else {
			const issues = await api.get(`/repos/${repoName}/issues`, {
				params: {
					state: issueState,
					per_page: perPage,
					page,
				},
			});

			this.setState({ issues: issues.data, pageCount: issues.data.length });
		}
	};

	handleIssueState = issueState => {
		this.setState({ issueState });
	};

	handleIssuePage = (page, button) => {
		this.setState({ page: page + Number(button) });
	};

	render() {
		const {
			repository,
			issues,
			owner,
			loading,
			issueState,
			page,
			perPage,
			pageCount,
		} = this.state;

		if (loading) {
			return (
				<Loading>
					<FaSpinner color="#fff" size={32} /> Carregando...
				</Loading>
			);
		}

		return (
			<Container>
				<Owner>
					<Link to="/">
						<MdArrowBack />
						back to main page
					</Link>
					<img src={owner.avatar_url} alt={owner.login} />
					<h1>{repository.full_name}</h1>
					<p>{repository.description}</p>
					<IssueStates>
						<button
							type="button"
							ref="all"
							onClick={() => this.handleIssueState('all')}
							defaultChecked
						>
							all
						</button>
						<button
							type="button"
							ref="open"
							autoFocus
							onClick={() => this.handleIssueState('open')}
						>
							open
						</button>
						<button
							type="button"
							ref="closed"
							onClick={() => this.handleIssueState('closed')}
						>
							closed
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

				<Pagination>
					<button
						type="button"
						disabled={page === Number(1)}
						onClick={() => this.handleIssuePage(page, Number(-1))}
					>
						<MdArrowBack /> previous page
					</button>
					<button type="button">{page}</button>
					<button
						type="button"
						disabled={pageCount < perPage}
						onClick={() => this.handleIssuePage(page, Number(+1))}
					>
						next page
						<MdArrowForward />
					</button>
				</Pagination>
			</Container>
		);
	}
}

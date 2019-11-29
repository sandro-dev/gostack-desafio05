import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const Loading = styled.div`
	font-size: 38px;
	font-weight: bold;
	color: #fff;
	font-family: 'Courier New', Courier, monospace;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;

	svg {
		margin-right: 10px;
		animation: ${rotate} 1s linear infinite;
	}
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1,
	p {
		margin: 10px 0;
	}

	p {
		font-family: 'Courier New', Courier, monospace;
		font-size: 12px;
		line-height: 1.4;
		color: #999;
		width: 400px;
		text-align: center;
	}

	img {
		width: 120px;
		border-radius: 60px;
	}

	a {
		text-decoration: none;
		color: #333;
		font-size: 18px;
		padding: 10px;
		border: 1px dashed #eee;
		border-radius: 8px;
		margin: 10px;
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			font-size: 28px;
		}
	}

	a:hover {
		color: #00c2c9;
	}
`;

export const Issues = styled.ul`
	margin-top: 10px;
	list-style: none;

	h2 {
		color: #333;
	}

	li {
		padding: 10px 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 2px dashed #eee;
		border-radius: 4px;
		margin-top: 10px;

		img {
			width: 60px;
			border-radius: 30px;
			border: 1px solid #eee;
			margin-right: 10px;
		}
	}
`;

export const IssueDescription = styled.div`
	display: flex;
	flex-direction: column;

	a {
		font-family: 'Courier New', Courier, monospace;
		font-size: 15px;
		line-height: 1.4;
		color: #333;
		text-decoration: none;
	}
	a:hover {
		color: #00c2c9;
	}

	strong {
		color: #00c2c9;
		font-weight: bold;
		font-size: 14px;
	}
`;

export const IssueStates = styled.div`
	button {
		padding: 10px;
		margin: 10px;
		border-radius: 8px;
	}

	button:active,
	button:focus {
		background: #00c2c9;
		color: #fff;
	}
`;

export const Pagination = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 10px;
	max-width: 700px;

	button {
		padding: 10px 15px;
		margin: 5px;
		border: 1px solid #eee;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	button:active,
	button:focus,
	button:nth-child(2) {
		background: #00c2c9;
		color: #fff;
	}

	a:active,
	a:focus,
	a:target {
		background: #00c2c9;
		color: #fff;
	}

	button:disabled {
		cursor: not-allowed;
	}
`;

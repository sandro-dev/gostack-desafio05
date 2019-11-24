import styled from 'styled-components';

export const Loading = styled.div`
	font-size: 38px;
	font-weight: bold;
	color: #fff;
	font-family: 'Courier New', Courier, monospace;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

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
	margin-top: 50px;
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

export const States = styled.div`
	button {
		padding: 10px;
		margin: 10px;
		border-radius: 8px;
	}
`;

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
`;

export const Issues = styled.ul`
	margin-top: 50px;
	list-style: none;

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
	h3 {
		font-family: 'Courier New', Courier, monospace;
		font-size: 16px;
		line-height: 1.4;
		color: #333;
	}

	span {
		color: #00c2c9;
		font-weight: bold;
		font-size: 14px;
	}
`;

import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
	max-width: 700px;
	min-height: 50vh;
	margin: 80px auto;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	padding: 30px;

	h1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 26px;
		font-family: Arial, Helvetica, sans-serif;

		svg {
			margin-right: 10px;
		}
	}
`;

export const Form = styled.form`
	margin-top: 20px;
	display: flex;
	flex-direction: row;
`;

export const Input = styled.input`
	flex: 1;
	border: 1px solid ${props => (props.error ? '#f00' : '#eee')};
	padding: 10px 15px;
	border-radius: 4px;
	font-size: 16px;
`;

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const SubmitButton = styled.button.attrs(props => ({
	type: 'submit',
	disabled: props.loading,
}))`
	background-color: #00c2c9;
	padding: 0 15px;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.3;
	}
	${props =>
		props.loading &&
		css`
		svg {
				animation: ${rotate} 2s linear infinite;
		`}
`;

export const List = styled.ul`
	margin-top: 30px;
	list-style: none;

	li {
		font-size: 22px;
		padding: 10px;

		& + li {
			border-top: 1px solid #eee;
			margin-top: 10px;
		}

		a {
			text-decoration: none;
			color: #333;
		}

		a:hover {
			font-size: 32px;
			color: #00c2c9;
		}
	}
`;

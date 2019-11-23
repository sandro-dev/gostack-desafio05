import styled from 'styled-components';

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

	input {
		flex: 1;
		border: 1px solid #eee;
		padding: 10px 15px;
		border-radius: 4px;
		font-size: 16px;
	}
`;

export const SubmitButton = styled.button.attrs({
	type: 'submit',
})`
	background-color: #00c2c9;
	padding: 0 15px;
`;

export const List = styled.ul``;

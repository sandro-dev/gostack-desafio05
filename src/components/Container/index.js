import styled from 'styled-components';

const Container = styled.div`
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
export default Container;

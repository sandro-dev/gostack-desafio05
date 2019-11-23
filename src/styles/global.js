import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
	}

	html, body, #root {
		min-height: 100%;
	}

	body {
		background: #00c8c9;
		-webkit-font-smoothing: antialiased !important;
	}

	input, button {
		border: 0;
	}

	button {
		cursor: pointer;
	}

`;


const render = (containerSelector) => {
	const container = document.querySelector(containerSelector);

	if (!container) {
		console.error(
			`Container with selector: ${containerSelector} does not exist`
		);
		return;
	}

};

render(".todo");

// function createDOMElements:

const createTagElements = (tagName, attribute = {}, children = []) => {
	const tagElement = document.createElement(tagName);

	for (const [key, value] of Object.entries(attribute)) {
		tagElement.setAttribute(key, value);
	}

	children.forEach((child) => tagElement.appendChild(child));

	return tagElement;
};


// input email
const createInputElement = (type, className, id, name, placeholder) => {
	const input = createTagElements(type, {
		class: className,
		id: id,
		name: name,
		placeholder: placeholder,
	});

	return input;
};

// label for email
const createLabel = (type, forAttribute, text) => {
	const label = createTagElements(type, { for: forAttribute }, [
		document.createTextNode(text),
	]);

	return label;
};

// parent container for input email:
const inputFieldContainer = () => {
	const container = createTagElements("div", { class: "form__input-field" });
	return container;
};

// error message for input email
const createErrorMessage = (tagName, className, text) => {
	const errorMessage = createTagElements(tagName, { class: className }, [
		document.createTextNode(text),
	]);
	return errorMessage;
};

// success message dla input email:

const createSuccessMessageEmail = (tagName, className, text) => {
	const successMessageEmail = createTagElements(tagName, { class: className }, [
		document.createTextNode(text),
	]);
	return successMessageEmail;
};

// parent container for password

const inputPasswordContainerField = () => {
	const container = createTagElements("div", { class: "form__password-field" });

	return container;
};

//label password

const createLabelPassword = (type, forAttribute, text) => {
	const labelPassword = createTagElements(type, { for: forAttribute }, [
		document.createTextNode(text),
	]);

	return labelPassword;
};

//input password
const createInputPassword = (
	tagName,
	typeAttribute,
	className,
	id,
	placeholder,
	minLength,
	maxLength
) => {
	const password = createTagElements(tagName, {
		type: typeAttribute,
		class: className,
		id: id,
		placeholder: placeholder,
		minLength: minLength,
		maxLength: maxLength
	});

	return password;
};


// error message password:

const createErrorMessagePassword = (tagName, className, text) => {
	const errorMessagePassword = createTagElements(
		tagName,
		{ class: className },
		[document.createTextNode(text)]
	);
	return errorMessagePassword;
};

// success message password:

const createSuccessMessagePassword = (tagName, className, text) => {
	const successMessagePassword = createTagElements(
		tagName,
		{ class: className },
		[document.createTextNode(text)]
	);

	return successMessagePassword;
};

// button submit for form

const createButton = (type, className, text) => {
	const button = createTagElements(type, { class: className }, [
		document.createTextNode(text),
	]);
	return button;
};


// function checks are any field empty;

const checkIsAnyEmpty = () => {
	const inputs = [password, email];

	const isInputEmpty = inputs.every((input) => input.value === "");
	isInputEmpty
		? (inputs.forEach((input) => {
				input.parentElement.classList.add("error");
		  }),
		  (errorMessagePassword.innerText = "Can't be blank!"),
		  (errorMessageEmail.innerText = "Can't be blank!"))

		: null;
};

// function validate email:
const validateEmail = (email) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
};

// function validate password:

const validatePassword = (password) => {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	return regex.test(password);
};

// function submitting form and invoking other functions:

const handleSubmit = (e) => {
	e.preventDefault();
	checkIsAnyEmpty();
	handleErrorMassage();
	handleSuccessMessage();
};
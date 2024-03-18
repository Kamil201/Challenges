// function createDOMElements:
const createTagElements = (tagName, attribute = {}, children = []) => {
	const tagElement = document.createElement(tagName);

	if (!Object.keys(attribute).length) {
		return tagElement;
	}
	

	if (typeof attribute !== "object") {
		throw new TypeError("Attribute must be an object");
	}

	if (!Array.isArray(children)) {
		throw new TypeError("Children must be an array");
	}

	for (const [key, value] of Object.entries(attribute)) {
		tagElement.setAttribute(key, value);
	}

	children.forEach((child) => {
		if (child instanceof Node) {
			tagElement.appendChild(child);
		} else {
			throw new TypeError("Child must be an instance of Node");
		}
	});

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

const inputPasswordConfirmContainerField = () => {
	const container = createTagElements("div", {
		class: "form__confirm-password-field",
	});
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
		maxLength: maxLength,
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

//label confirm password

const createLabelConfirmPassword = (type, forAttribute, text) => {
	const labelConfirmPassword = createTagElements(type, { for: forAttribute }, [
		document.createTextNode(text),
	]);

	return labelConfirmPassword;
};

// confirm password:
const createConfirmPassword = (
	tagName,
	typeAttribute,
	className,
	id,
	placeholder
) => {
	const confirmPassword = createTagElements(tagName, {
		type: typeAttribute,
		class: className,
		id: id,
		placeholder: placeholder,
	});

	return confirmPassword;
};

//confirm error confirm message
const createConfirmErrorMessage = (tagName, className, text) => {
	const confirmErrorMessage = createTagElements(
		tagName,
		{ class: className },
		[document.createTextNode(text)].filter((tagName) => tagName !== null)
	);
	return confirmErrorMessage;
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
	const inputs = [password, email, confirmPassword];
	const isInputEmpty = inputs.every((input) => input.value === "");

	isInputEmpty
		? (inputs.forEach((input) => {
				input.parentElement.classList.add("error");
		  }),
		  (errorMessagePassword.innerText = "Can't be blank!"),
		  (errorMessageEmail.innerText = "Can't be blank!"),
		  (errorMessagePasswordConfirm.innerText = "Can't be blank!"))
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

const evaluatePasswordStrength = (password) => {
	const passwordCriteria = [
		{ label: "Very weak", minLength: 6, score: 0 },
		{ label: "Weak", minLength: 8, score: 1 },
		{ label: "Medium", minLength: 10, score: 2 },
		{ label: "Strong", minLength: 12, score: 3 },
		{ label: "Very strong", minLength: 14, score: 4 },
	];

	return passwordCriteria.find(
		({ minLength, score }) => password.length >= minLength
	).score;
};

// function submitting form and invoking other functions:

const handleSubmit = (e) => {
	e.preventDefault();
	checkIsAnyEmpty();
	handleErrorMassage();
	handleSuccessMessage();
};

// Create a button to toggle password visibility
const createVisibilityToggle = () => {
	const toggleButton = createButton("button", "form__toggle-button", "");
	const icon = createTagElements("i", { class: "bx bxs-show" });

	toggleButton.appendChild(icon);

	toggleButton.addEventListener("click", () => {
		const type =
			password.getAttribute("type") === "password" ? "text" : "password";
		password.setAttribute("type", type);

		// Toggle the icon based on password visibility
		icon.className = type === "password" ? "bx bxs-show" : "bx bxs-hide";
	});

	return toggleButton;
};

// function render form elements
const renderFormElements = () => {
	const form = createTagElements("form", { class: "form__container" });

	const containerInputEmailField = createTagElements("div", {
		class: "form__input-field",
	});

	const label = createLabel("label", "email", "email", "Email");

	const input = createInputElement(
		"input",
		"form__input",
		"email",
		"email",
		"Enter your email..."
	);

	const containerInputPasswordField = createTagElements("div", {
		class: "form__password-field",
	});

	const errorMessageEmail = createErrorMessage("p", "form__error-email", "");

	const successMessageEmail = createSuccessMessageEmail(
		"p",
		"form__success-email",
		""
	);

	const labelPassword = createLabelPassword(
		"label",
		"password",
		"password",
		"password"
	);

	const password = createInputPassword(
		"input",
		"password",
		"form__input-password",
		"password",
		"Enter your password",
		"8", // min-length
		"20" // max-length
	);

	const errorMessagePassword = createErrorMessagePassword(
		"p",
		"form__error-password",
		""
	);

	const successMessagePassword = createSuccessMessagePassword(
		"p",
		"form__success-password",
		""
	);

	const containerInputConfirmPasswordField = createTagElements("div", {
		class: "form__confirm-password-field",
	});

	const labelConfirmPassword = createLabelConfirmPassword(
		"label",
		"confirm-password",
		"confirm-password",
		"confirm-password"
	);

	const confirmPassword = createConfirmPassword(
		"input",
		"password",
		"form__input-confirm-password",
		"confirm-password",
		"Confirm your password",
		"8",
		"20"
	);

	const errorMessagePasswordConfirm = createConfirmErrorMessage(
		"p",
		"form__error-confirm-password",
		""
	);
	const successMessagePasswordConfirm = createSuccessMessagePassword(
		"p",
		"form__success-confirm-password",
		""
	);

	const button = createButton("button", "form__button", "Submit");

	form.append(
		containerInputEmailField,
		containerInputPasswordField,
		containerInputConfirmPasswordField,
		button
	);

	containerInputEmailField.append(
		label,
		input,
		errorMessageEmail,
		successMessageEmail
	);

	containerInputPasswordField.append(
		labelPassword,
		password,
		errorMessagePassword,
		successMessagePassword
	);

	containerInputConfirmPasswordField.append(
		labelConfirmPassword,
		confirmPassword,
		errorMessagePasswordConfirm,
		successMessagePasswordConfirm
	);

	form.addEventListener("submit", handleSubmit);

	return form;
};

// function renderApp:

const renderApp = () => {
	const container = createTagElements("div", { class: "form__content" }, [
		renderFormElements(),
	]);

	return container;
};

// function init:

const init = (containerSelector) => {
	const container = document.querySelector(containerSelector);

	if (!container) {
		console.error(`container with selector: ${containerSelector} not found`);
	}

	const app = renderApp();

	container.appendChild(app);
};

//wywołanie funkcji w określonym selektorze

init(".form");

// grabbing elements into DOM

const email = document.querySelector(".form__input");

const password = document.querySelector(".form__input-password");

const errorMessageEmail = document.querySelector(".form__error-email");

const errorMessagePassword = document.querySelector(".form__error-password");

const successMessageEmail = document.querySelector(".form__success-email");

const successMessagePassword = document.querySelector(
	".form__success-password"
);

const confirmPassword = document.querySelector(".form__input-confirm-password");

const errorMessagePasswordConfirm = document.querySelector(
	".form__error-confirm-password"
);

const successMessagePasswordConfirm = document.querySelector(
	".form__success-confirm-password"
);

// function validate fields
const validateField = (
	input,
	errorElement,
	validationFn,
	errorMessage,
	minLength,
	required,
	maxLength,
	confirmPassword
) => {
	const value = input.value;
	const isValid = validationFn(value);

	if (required && value.trim() === "") {
		input.parentElement.classList.add("error");
		errorElement.textContent = "This field is required!";
		return false;
	}

	if (minLength && value.length < minLength) {
		input.parentElement.classList.add("error");
		errorElement.textContent = `Must be at least ${minLength} characters long!`;

		return false;
	}

	if (maxLength && value.length > maxLength) {
		input.parentElement.classList.add("error");
		errorElement.textContent = `Must be at most ${maxLength} characters long!`;
		return false;
	}

	if (confirmPassword && value !== confirmPassword.value) {
		input.parentElement.classList.add("error");
		errorElement.textContent = "Passwords don't match!";
		return false;
	}

	input.parentElement.classList.toggle("error", !isValid);
	errorElement.textContent = isValid ? "" : errorMessage;

	if (input.id === "password") {
		const passwordStrength = evaluatePasswordStrength(value);
		console.log("Siła hasła:", passwordStrength);
	}

	input.parentElement.classList.toggle("error", !isValid);
	errorElement.textContent = isValid ? "" : errorMessage;

	return isValid;
};

email.addEventListener("input", () => {
	validateField(
		email,
		errorMessageEmail,
		validateEmail,
		"Wrong email format! Email must contain @ , one special character and no spaces !",
		"",
		true
	);

	handleSuccessMessage();
});

password.addEventListener("input", () => {
	validateField(
		password,
		errorMessagePassword,
		validatePassword,
		"Wrong password format!",
		8,
		true,
		15
	);
	handleSuccessMessage();
});

confirmPassword.addEventListener("input", () => {
	validateField(
		confirmPassword,
		errorMessagePasswordConfirm,
		validatePassword,
		"Passwords don't match!",
		8,
		true,
		15
	);
	handleSuccessMessage();
});

const handleSuccessMessage = () => {
	if (validateEmail(email.value)) {
		email.parentElement.classList.remove("error");
		errorMessageEmail.innerText = "";

		successMessageEmail.innerText = "email is correct!";
		email.parentElement.classList.add("success");
	}

	if (validatePassword(password.value)) {
		password.parentElement.classList.remove("error");

		errorMessagePassword.innerText = "";

		successMessagePassword.innerText = "password is correct!";

		password.parentElement.classList.add("success");
	}

	if (validatePassword(confirmPassword.value)) {
		confirmPassword.parentElement.classList.remove("error");

		errorMessagePasswordConfirm.innerText = "";

		successMessagePasswordConfirm.innerText = "confirm password is correct!";

		confirmPassword.parentElement.classList.add("success");
	}
};

const handleErrorMassage = () => {
	if (validateEmail(email.value)) {
		email.parentElement.classList.add("error");
		errorMessageEmail.innerText = "Wrong email format!";
	}

	if (validatePassword(password.value)) {
		password.parentElement.classList.add("error");
		errorMessagePassword.innerText = "Wrong password format!";
	}
};

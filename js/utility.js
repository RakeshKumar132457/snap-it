export const generateRandomName = (length) => {
	let randomName = "";
	for (let i = 0; i < length; i++) {
		randomName += String.fromCharCode(97 + getRandomNum(0, 25));
	}
	return randomName;
};

export const getRandomNum = (from, to) => {
	return Math.floor(Math.random() * (from - to) + to);
};

export const stringHash = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 7) - hash + char;
		hash |= 0; // Convert to 32-bit integer
	}
	return hash;
};

export const hashToPastelColor = (str: string) => {
	const hash = stringHash(str);

	// Use the hash to generate a hue value between 0 and 360.
	const hue = hash % 360;

	// Set the saturation and luminance to achieve a pastel look.
	// Adjust these values based on your preference.
	const saturation = 50; // 50% saturation
	const luminance = 85; // 85% lightness, making it light/pastel

	return `hsl(${hue}, ${saturation}%, ${luminance}%)`;
};

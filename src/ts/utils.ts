import { page } from '$app/stores';
import { get } from 'svelte/store';

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

export const statusToPastelleColor = (status: number) => {
	switch (status) {
		case 0:
			return '#b3ffb3cf';
		case 1:
			return '#ffffb3cf';
		case 2:
			return '#ffb3b3cf';
		case 3:
			return '#b3b3ffcf';
	}
};

export const parseCSV = (csvString: string) => {
	if (!csvString) return;
	const rows = csvString?.split('\n');
	const data = rows?.map((row) => row?.split(','));
	let items: Item[] = [];
	data.forEach((row) => {
		items.push({
			name: row[0],
			quantity: parseInt(row[1]),
			price: parseFloat(row[2]?.replace('$', '')),
			rate: 'standard'
		});
	});
	// console.log(data, items);
	return { data, items };
};

export const downloadPDF = async (filename: string) => {
	const response = await fetch(get(page)?.url?.origin + '/' + filename);
	if (!response.ok) {
		throw new Error(`Failed to fetch PDF: ${response.statusText}`);
	}

	const blob = await response.blob();
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'Podklady_k_dani_z_přidané_hodnoty.pdf'; // Name of the downloaded file
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

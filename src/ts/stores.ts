import { writable } from 'svelte/store';
import type { Item } from './interfaces';
import { parseCSV } from './utils';

export const transactionItems = writable<Map<string, string>>(new Map());
transactionItems.subscribe((value) => {
	console.log('transactionItems', value);
});
// transactionItems.update((v) => {
// 	v.set(
// 		'TX12347',
// 		'Non Vegetable Thalit, 1, $11.9\nGinger Minticed Tea, 1, $2.95')?.items
// 	);
// 	return v;
// });

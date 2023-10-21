import { writable } from 'svelte/store';
import type { Item } from './interfaces';

export const transactionItems = writable<Map<string, Item[]>>(new Map());

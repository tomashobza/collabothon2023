export interface Transaction {
	date: Date;
	transactionId: string;
	description: string;
	labels: SubArrayOfLabels; // Assuming you have an enum or another type for 'Category'
	amount: number;
	accountBalanceAfterTransaction: number;
	paymentMethod: PaymentMethod; // Assuming you have an enum or another type for 'PaymentMethod'
	status: TransactionStatus; // Assuming you have an enum or another type for 'TransactionStatus'
	attachments?: Attachment[]; // Assuming 'Attachment' is another type, could be string if just paths to attachments
	notes?: string;
	counterparty?: string;
	location?: string;
	currency: Currency; // Assuming you have an enum or another type for 'Currency'
	isTaxRelevant: boolean;
	items?: Item[];
}

export type Item = {
	name: string;
	quantity: number;
	price: number;
	rate: 'standard' | 'reduced' | 'secondReduced' | 'none';
};

type Label =
	| 'REVENUES_SALES'
	| 'FIXED_ASSETS'
	| 'CONSUMABLES_SUPPLIES'
	| 'TRAVEL_ACCOMMODATION'
	| 'WAGES_SALARIES'
	| 'SOCIAL_HEALTH_INSURANCE'
	| 'PROFESSIONAL_SERVICES'
	| 'RENT_UTILITIES'
	| 'MARKETING_PROMOTION'
	| 'EDUCATION_TRAINING'
	| 'OTHER_EXPENSES';

type SubArrayOfLabels = Label[];

// Examples of possible additional types/enums:

export enum PaymentMethod {
	CREDIT_CARD,
	DEBIT_CARD,
	BANK_TRANSFER
	// ... other methods
}

export enum TransactionStatus {
	COMPLETED,
	PENDING,
	FAILED,
	REVERSED
}

export type Currency = 'USD' | 'EUR' | 'CZK' | 'GBP' | 'CHF' | 'JPY' | 'CAD';

interface Attachment {
	filename: string;
	path: string;
	uploadedDate: Date;
	// ... any other fields relevant to an attachment
}

export const methodEnumToString = {
	[PaymentMethod.CREDIT_CARD]: 'Credit card',
	[PaymentMethod.DEBIT_CARD]: 'Debit card',
	[PaymentMethod.BANK_TRANSFER]: 'Bank transfer'
};

export const statusEnumToString = {
	[TransactionStatus.COMPLETED]: 'Completed',
	[TransactionStatus.PENDING]: 'Pending',
	[TransactionStatus.FAILED]: 'Failed',
	[TransactionStatus.REVERSED]: 'Reversed'
};

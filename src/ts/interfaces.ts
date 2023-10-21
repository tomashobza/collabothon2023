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
}

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

export enum Currency {
	CZK, // Czech Koruna
	USD,
	EUR
	// ... other currencies
}

interface Attachment {
	filename: string;
	path: string;
	uploadedDate: Date;
	// ... any other fields relevant to an attachment
}

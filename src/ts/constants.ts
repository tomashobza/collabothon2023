import { PaymentMethod, TransactionStatus, type Transaction, Currency } from './interfaces';

const LABELS: string[] = [
	'Revenues/Sales',
	'Fixed Assets',
	'Consumables and Supplies',
	'Travel and Accommodation',
	'Wages and Salaries',
	'Social and Health Insurance Contributions',
	'Professional Services',
	'Rent and Utilities',
	'Marketing and Promotion',
	'Education and Training',
	'Other Expenses'
];

export const mockTransactions: Transaction[] = [
	{
		date: new Date('2023-10-01'),
		transactionId: 'TX12345',
		description: 'Apple MacBook Purchase',
		labels: ['REVENUES_SALES', 'FIXED_ASSETS'],
		amount: -2000,
		accountBalanceAfterTransaction: 3000,
		paymentMethod: PaymentMethod.CREDIT_CARD,
		status: TransactionStatus.COMPLETED,
		attachments: [
			{
				filename: 'receipt1.jpg',
				path: '/path/to/receipt1.jpg',
				uploadedDate: new Date('2023-10-01')
			}
		],
		notes: 'MacBook for graphic design work',
		counterparty: 'Apple Inc.',
		location: 'San Francisco, CA',
		currency: Currency.USD,
		isTaxRelevant: true
	},
	{
		date: new Date('2023-10-15'),
		transactionId: 'TX12346',
		description: 'Office Rent',
		labels: ['RENT_UTILITIES'],
		amount: -500,
		accountBalanceAfterTransaction: 2500,
		paymentMethod: PaymentMethod.BANK_TRANSFER,
		status: TransactionStatus.PENDING,
		notes: 'Monthly office rent',
		counterparty: 'XYZ Properties',
		location: 'Prague',
		currency: Currency.CZK,
		isTaxRelevant: true
	},
	{
		date: new Date('2023-10-20'),
		transactionId: 'TX12347',
		description: 'Client Invoice Payment',
		labels: ['REVENUES_SALES'],
		amount: 1500,
		accountBalanceAfterTransaction: 4000,
		paymentMethod: PaymentMethod.BANK_TRANSFER,
		status: TransactionStatus.COMPLETED,
		notes: 'Payment for design project',
		counterparty: 'ABC Enterprises',
		currency: Currency.EUR,
		isTaxRelevant: true
	}
];

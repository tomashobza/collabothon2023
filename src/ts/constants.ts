import { PaymentMethod, TransactionStatus, type Transaction } from './interfaces';

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
		currency: 'USD',
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
		currency: 'CZK',
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
		currency: 'EUR',
		isTaxRelevant: true
	},
	{
		date: new Date('2023-10-21'),
		transactionId: 'TX12348',
		description: 'Adobe Creative Cloud Subscription',
		labels: ['PROFESSIONAL_SERVICES'],
		amount: -50,
		accountBalanceAfterTransaction: 3950,
		paymentMethod: PaymentMethod.CREDIT_CARD,
		status: TransactionStatus.COMPLETED,
		attachments: [
			{
				filename: 'invoice_adobe.pdf',
				path: '/path/to/invoice_adobe.pdf',
				uploadedDate: new Date('2023-10-21')
			}
		],
		notes: 'Monthly subscription for graphic design software',
		counterparty: 'Adobe Inc.',
		location: 'Online',
		currency: 'USD',
		isTaxRelevant: true
	},
	{
		date: new Date('2023-10-22'),
		transactionId: 'TX12349',
		description: 'Coffee Shop Meeting',
		labels: ['CONSUMABLES_SUPPLIES', 'TRAVEL_ACCOMMODATION'],
		amount: -20,
		accountBalanceAfterTransaction: 3930,
		paymentMethod: PaymentMethod.DEBIT_CARD,
		status: TransactionStatus.COMPLETED,
		notes: 'Coffee and snacks for client meeting',
		counterparty: 'Coffee Bliss',
		location: 'Prague',
		currency: 'CZK',
		isTaxRelevant: true
	},
	{
		date: new Date('2023-10-25'),
		transactionId: 'TX12350',
		description: 'Tax Consultant Fee',
		labels: ['PROFESSIONAL_SERVICES'],
		amount: -300,
		accountBalanceAfterTransaction: 3630,
		paymentMethod: PaymentMethod.BANK_TRANSFER,
		status: TransactionStatus.COMPLETED,
		attachments: [
			{
				filename: 'receipt_consultant.pdf',
				path: '/path/to/receipt_consultant.pdf',
				uploadedDate: new Date('2023-10-25')
			}
		],
		notes: 'Annual fee for tax consultation services',
		counterparty: 'Financial Wizards Ltd.',
		location: 'Brno',
		currency: 'CZK',
		isTaxRelevant: true
	},
	{
		date: new Date('2023-10-26'),
		transactionId: 'TX12351',
		description: 'Marketing Workshop',
		labels: ['EDUCATION_TRAINING', 'MARKETING_PROMOTION'],
		amount: -150,
		accountBalanceAfterTransaction: 3480,
		paymentMethod: PaymentMethod.CREDIT_CARD,
		status: TransactionStatus.PENDING,
		notes: 'Participation fee for marketing workshop',
		counterparty: 'Marketing Masters',
		location: 'Berlin',
		currency: 'EUR',
		isTaxRelevant: true
	}
];

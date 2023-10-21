import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const openai = new OpenAI({
		apiKey: env.OPENAI_API_KEY // Use environment variable for security
	});

	// Utility function to read the body content from the stream
	async function readStream(stream) {
		const reader = stream.getReader();
		let result = '';

		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			result += new TextDecoder().decode(value);
		}

		return result;
	}

	async function parseReceipt(): Promise<Response> {
		try {
			const receiptContent = await readStream(request.body);

			console.log(receiptContent);
			const chatCompletion = await openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content:
							"You are a helper bot that extracts items from a receipts. The reciept was scanned using an ORM, so the text is not perfect. Make sure to extract the items and their prices. Return the items in a csv format. One column is the name, second column is the quantity, and the third column is the price. Don't name the columns. Missing data points leave empty, but there always have to be three columns. Remove the subtotal and the total from the receipt."
					},
					{ role: 'user', content: `Parse this receipt: ${receiptContent}` }
				],
				model: 'gpt-3.5-turbo'
			});

			console.log(chatCompletion);

			// Extract the content from ChatGPT's response
			const parsedItems = chatCompletion.choices[0]?.message;

			return new Response(JSON.stringify(parsedItems), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (err) {
			console.error(err);
			return new Response('Failed to parse the receipt', { status: 500 });
		}
	}

	return await parseReceipt();
};

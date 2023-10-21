import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const openai = new OpenAI({
		apiKey: env.OPENAI_API_KEY // Use environment variable for security
	});

	async function parseReceipt(): Promise<Response> {
		try {
			console.log(request.body);
			const chatCompletion = await openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content:
							'You are a helper bot that extracts items from a receipts. The reciept was scanned using an ORM, so the text is not perfect.'
					},
					{ role: 'user', content: `Parse this receipt: ${request.body}` }
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

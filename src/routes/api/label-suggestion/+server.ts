import { LABELS } from '$ts/constants';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

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

	async function suggestLabel(): Promise<Response> {
		try {
			const requestBody = JSON.parse(await readStream(request.body));
			const transactions = requestBody.transactions;
			const newTransaction = requestBody.newTransaction;

			const chatCompletion = await openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content: `You are a helper bot that suggests appropriate categories for transactions based on past transactions and available labels. The labels to choose from are: ${LABELS.join(
							', '
						)}. Return just the labels separated by commas. Nothing else. Make sure that the labels are relevant to the transaction (especially the description). If you are not sure, return an empty string. Don't add a trailing comma. Suggest about 2 labels.`
					},
					{
						role: 'user',
						content: `Given these past transactions: ${transactions}, suggest a label for this new transaction: ${newTransaction}`
					}
				],
				model: 'gpt-3.5-turbo'
			});

			console.log(chatCompletion);

			// Extract the label suggestion from ChatGPT's response
			const labelSuggestion = chatCompletion.choices[0]?.message;

			return new Response(JSON.stringify({ labelSuggestion }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (err) {
			console.error(err);
			return new Response('Failed to suggest a label', { status: 500 });
		}
	}

	return await suggestLabel();
};

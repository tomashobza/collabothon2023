import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';

export const GET: RequestHandler = async ({ url }) => {
	const openai = new OpenAI({
		apiKey: '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' // defaults to process.env["OPENAI_API_KEY"]
	});

	async function main() {
		try {
			const chatCompletion = await openai.chat.completions.create({
				messages: [{ role: 'user', content: 'Say this is a test' }],
				model: 'gpt-3.5-turbo'
			});

			console.log(chatCompletion.choices);
		} catch (err) {
			console.error(err);
		}
	}

	main();

	return new Response(String(await main()));
};

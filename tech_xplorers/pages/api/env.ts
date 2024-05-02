// pages/api/env.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { ANTHROPIC_API_KEY } = process.env;
	if (!ANTHROPIC_API_KEY) {
		return res.status(500).json({ error: 'Environment variable ANTHROPIC_API_KEY not found.' });
	}
	return res.status(200).json({ ANTHROPIC_API_KEY });
}

import express from 'express';
import Text from '../models/Text.js'
import { customAlphabet } from 'nanoid';

const router = express.Router()
const MAX_ATTEMPTS = 15
let code, exists, attempts = 0;

router.post("/", async (req, res) => {
	let { content } = req.body;
		const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 4);
		do {
			code = nanoid();
			exists = await Text.findOne({ code });
			attempts++;
		} while (exists && attempts <= MAX_ATTEMPTS);
		if (exists)
			return res.status(500).json({ error: "Could not generate unique code, please try again later" });

	try {
		const newText = await Text.create({ code, content });
		res.json({ code });
	} catch {
		res.status(500).json({ error: "Could not save text" });
	}
});

router.get('/:code', async(req, res) => {
    const {code} = req.params
	if (!code){
		return res.status(404).json({ error: "Code missing" });
	}
    try{
        const text = await Text.findOne({code})
        if (!text){
            return res.status(404).json({error: "Link not found or expired"})
        }
		res.json({ content: text.content });
    }catch(err){
        res.status(500).json({ error: "Error fetching text" });
    }
})

export default router;
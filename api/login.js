import { MongoClient } from 'mongodb';
import { createHash } from 'crypto';

// The URI is automatically pulled from Vercel's environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { serviceNumber, authKey } = req.body;
    const hashedKey = createHash('sha256').update(authKey).digest('hex');

    try {
        await client.connect();
        const database = client.db('mi6_agency');
        const agents = database.collection('agents');

        // Look for the user
        const agent = await agents.findOne({ serviceNumber: serviceNumber });

        if (agent && agent.password === hashedKey) {
            return res.status(200).json({
                success: true,
                name: agent.name,
                clearance: agent.clearance,
                role: agent.role
            });
        } else {
            return res.status(401).json({ success: false });
        }
    } catch (e) {
        return res.status(500).json({ error: "Database Link Error" });
    } finally {
        await client.close();
    }
}
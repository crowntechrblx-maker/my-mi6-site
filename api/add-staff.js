import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Use a secret header so only you can add staff
  const secret = req.headers['auth-token'];
  if (secret !== 'MY_ADMIN_SECRET') return res.status(401).send('Unauthorized');

  // Hashing passwords is better, but for a replica, we'll store them 
  // as objects inside the key 'staff:[serviceNumber]'
  await kv.hset('staff:007', { name: 'Commander Bond', key: 'London123', clearance: 'Level 7' });
  await kv.hset('staff:C', { name: 'Sir Richard', key: 'Vauxhall99', clearance: 'Level 9' });

  return res.status(200).send('Staff records updated in KV database.');
}
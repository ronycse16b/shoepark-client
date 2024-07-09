// pages/api/revalidate.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Revalidate the homepage or change to the specific path you want to revalidate
      await res.revalidate('/');
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send('Error revalidating');
    }
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}

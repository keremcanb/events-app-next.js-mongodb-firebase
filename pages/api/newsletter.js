import { connectDatabase, insertDocument } from '../../helpers/db-util';

// Req res auto passed by next.js
const handler = async (req, res) => {
  // Only use post method
  if (req.method === 'POST') {
    const { email } = req.body;
    // Server side email validation
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }
    // Add email
    try {
      await insertDocument(client, 'newsletter', { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;

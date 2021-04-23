import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

const handler = async (req, res) => {
  // Get event ID
  const { eventId } = req.query;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }
  // Post Comment
  if (req.method === 'POST') {
    // Get comment info from form
    const { email, name, text } = req.body;
    // Server side validation
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }
  // Get Comments
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
};

export default handler;

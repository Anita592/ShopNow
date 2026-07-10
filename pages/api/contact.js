import Message from '../../models/Message';
import db from '../../utils/db';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send({ message: 'Të gjitha fushat janë të detyrueshme' });
  }
  await db.connect();
  await Message.create({ name, email, message });
  await db.disconnect();
  res.send({ message: 'Mesazhi u dërgua me sukses' });
};

export default handler;
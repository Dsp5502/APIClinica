import 'dotenv/config';

import { connect } from 'mongoose';

async function dbConnect(): Promise<void> {
  console.log('Connecting to DB...');
  const DB_URI = <string>process.env.DB_URI;
  await connect(DB_URI);
}

export default dbConnect;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const chalk = (await import('chalk')).default;
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(chalk.green.bold('✓ MongoDB connected successfully'));
    return mongoose;
  } catch (err) {
    const chalk = (await import('chalk')).default;
    console.error(chalk.red.bold('✗ Failed to connect to MongoDB:', err.message));
    process.exit(1);
  }
};

module.exports = connectDB;

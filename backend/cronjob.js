// cron/pollExpiry.js
import cron from 'node-cron';
import pollModel from './models/pollModel';

const startPollExpiryCron = (io) => {

  cron.schedule('* * * * *', async () => {
    try {
      const expiredPolls = await pollModel.find({
        status: 'Live',
        expiresAt: { $lte: new Date() }
      });

      if (expiredPolls.length === 0) return;

      const expiredIds = expiredPolls.map(p => p._id);

      await pollModel.updateMany(
        { _id: { $in: expiredIds } },
        {
          $set: {
            status: 'Closed',
            statusColor: 'bg-red-500',
            icon: 'closed',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            action: 'View Results',
          }
        }
      );

      expiredPolls.forEach(poll => {
        io.to(poll._id.toString()).emit('poll:closed', {
          pollId: poll._id,
          options: poll.options,
        });
      });

      console.log(`Closed ${expiredPolls.length} poll(s)`);
    } catch (err) {
      console.error('Poll expiry cron failed:', err);
    }
  });

};

export default startPollExpiryCron;
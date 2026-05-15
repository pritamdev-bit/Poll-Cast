import http from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import connectDB from './connectDB';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';
import pollModel from './models/pollModel';
import voteModel from './models/voteModel';
import cors from 'cors';
import startPollExpiryCron from './cronjob';

await connectDB();

async function main() {
    const port = process.env.PORT || 8080;
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        }
    });

    app.use(express.json());
    app.use(clerkMiddleware());
    app.use(cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173', // your Vite dev server
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }));

    io.on('connection', (socket) => {
        socket.on('join:poll', (pollId) => socket.join(pollId));
        socket.on('leave:poll', (pollId) => socket.leave(pollId));
    });



    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.post('/create-poll', async (req, res) => {
        const { title, options, validity } = req.body;
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await clerkClient.users.getUser(userId);

        const poll = await pollModel.create({
            title,
            status: 'Live',
            statusColor: 'bg-green-500',
            icon: 'chart',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            options,
            validity,
            author_id: userId,
            author: user.firstName,
            startTime: Date.now(),
            expiresAt: Date.now() + (validity * 60 * 1000),
            action: "View Results"
        });

        if (poll) {
            console.log(poll);
            res.status(201).json(poll._id);
        }

        res.status(500).json({ error: 'Something went wrong' });

    });

    app.post('/vote', async (req, res) => {
        const { poll_id, vote } = req.body;
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const existingVote = await voteModel.findOne({
            poll_id,
            voter_id: userId
        })

        if (existingVote) {
            return res.status(400).json({ error: 'You have already voted' });
        }

        const newVote = await voteModel.create({
            poll_id,
            voter_id: userId,
            voteOption: vote,
        });

        if (!newVote) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        const poll = await pollModel.findById(poll_id);

        if (poll.status === "Closed") {
            return res.status(400).json({ error: 'Poll is closed' });
        }

        const updatedPoll = await pollModel.findByIdAndUpdate(poll_id, {
            $inc: {
                [`options.${vote - 1}.vote`]: 1,
                votes: 1
            }
        }, { new: true });

        if (!updatedPoll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        io.to(poll_id).emit('vote:updated', { options: updatedPoll.options, votes: updatedPoll.votes });

        res.status(201).json({ success: true, message: 'Vote cast successfully' });
    });

    app.get('/polls/:id', async (req, res) => {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const existingVote = await voteModel.findOne({
            poll_id: req.params.id,
            voter_id: userId
        });

        const { id } = req.params;
        const poll = await pollModel.findById(id);

        if (poll) {
            res.status(200).json({ poll, existingVote });
        }

        res.status(500).json({ error: 'No poll found' });
    });

    app.get('/polls', async (req, res) => {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const polls = await pollModel.find({ author_id: userId }).sort({ createdAt: -1 });

        if (polls && polls.length > 0) {
            res.status(200).json(polls);
        }

        res.status(500).json({ error: 'No polls found' });
    });

    startPollExpiryCron(io);

    server.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
    });
}

main();
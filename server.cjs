const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config({ path: 'config.env' });

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

app.use(express.json());

const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(express.urlencoded({ extended: true }));

const bcrypt = require("bcryptjs");

const uri = process.env.MONGOURL;
//const { data } = require('react-router-dom');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

connectToMongoDB();

app.use(cors({
    origin: 'http://localhost:5173', // deployed frontend URL
    credentials: true,
}));

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://itws-4500-s25-team6.eastus.cloudapp.azure.com', // your real frontend origin
// ];

// app.use(cors({
//   origin: (origin, cb) => {
//     // allow non-browser tools (no origin) and whitelisted origins
//     if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//     return cb(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));


// SESSION SET UP 
app.use(
    session({
        secret: 'SECRET KEY',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: uri,
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'native',
        }),
        cookie: {
            sameSite: 'lax',
            secure: false,
            httpOnly: true,
        },
    })
);

app.get('/session', async (req, res) => {

    if (!req.session.userId) return res.json({});

    const userId = req.session.userId;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) return res.json({});

        res.json({
            _id: user._id.toString(),
            id: user.id != null ? String(user.id) : null,
            firstName: user.firstName,
            lastName: user.lastName,
            isProf: user.isProf || false
        });
    } catch (err) {
        console.error('Session fetch failed:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const database = client.db("CSNLabRegistration");
app.locals.db = database;
const userCollection = database.collection("Users");
const entryCollection = database.collection("Entries");

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log("Login attempt for email:", email);
    // console.log("Request body:", req.body);

    try {
        const user = await userCollection.findOne({ email });
        //console.log("hello");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            //if (password == user.password) {
            req.session.user = {
                _id: user._id,
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isProf: user.isProf
            };

            req.session.userId = user._id.toString();

            return res.status(200).json({
                success: true
                // individualUser: user.individualUser || false,
                // inGroup: user.inGroup || false,
                // groupLeader: user.groupLeader || false,
                // superAdmin: user.superAdmin || false
            });
        } else {
            return res.status(401).json({ message: "Invalid login" });
        }

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/signUp", async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!email.endsWith('@csn.edu')) {
            return res.status(400).json({ success: false, message: 'Only CSN emails are allowed.' });
        }


        // Check if user already exists
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const lastUser = await userCollection.find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userCollection.insertOne({
            id: newId,
            firstName,
            lastName,
            email,
            //password
            password: hashedPassword,
            isProf: false

        });

        //Store user information in session
        req.session.user = {
            id: newId,
            email,
            firstName,
            lastName,
            isProf
        };

        req.session.userId = newUser.insertedId.toString();


        res.status(201).json({ success: true, message: "Signup successful!" });


    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
});

app.post("/logEntry", async (req, res) => {
    try {
        const studentIdStr = req.session.userId;
        if (!studentIdStr) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const { roomNum, date, profName, profId, timeIn, timeOut } = req.body;
        
        // Validate required fields
        if (!roomNum || !date || !profId || !timeIn || !timeOut) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Validate ObjectIds
        if (!ObjectId.isValid(studentIdStr)) {
            return res.status(400).json({ success: false, message: "Invalid session user id." });
        }
        if (!ObjectId.isValid(profId)) {
            return res.status(400).json({ success: false, message: "Invalid professor id." });
        }

        const studentId = new ObjectId(studentIdStr);
        const profObjectId = new ObjectId(profId);

        // Ensure professor exists and isProf=true
        const prof = await userCollection.findOne({ _id: profObjectId, isProf: true });
        if (!prof) {
            return res.status(400).json({ success: false, message: "Selected professor not found." });
        }

        // Get next entry ID
        const lastEntry = await entryCollection.find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastEntry.length > 0 ? lastEntry[0].id + 1 : 1;

        // Insert new entry
        const newEntry = await entryCollection.insertOne({
            id: newId,
            userId: studentId,
            profId: profObjectId,
            profName,
            roomNum,
            date,
            timeIn,
            timeOut,
            createdAt: new Date()
        });

        res.status(201).json({ success: true, message: "Entry insertion successful!" });

    } catch (error) {
        console.error("Error adding entry:", error);
        res.status(500).json({ success: false, message: "Error adding entry", error: error.message });
    }
});

app.post("/studentHistory", async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        

        // multiple search variations
        let searchQueries = [
            { userId: userId }  
        ];

        if (ObjectId.isValid(userId)) {
            const userObjectId = new ObjectId(userId);
            searchQueries.push({ userId: userObjectId });
        }

        if (typeof userId !== 'string') {
            searchQueries.push({ userId: userId.toString() });
        }

        const query = { $or: searchQueries };

        const userEntries = await entryCollection
            .find(query)
            .sort({ date: -1, timeIn: -1 })
            .toArray();

        
        // if (userEntries.length > 0) {
        //     console.log("First entry userId:", userEntries[0].userId, typeof userEntries[0].userId);
        // }

        res.status(200).json({ success: true, entries: userEntries });

    } catch (error) {
        console.error("Error getting history:", error);
        res.status(500).json({ message: "Error getting history", error: error.message });
    }
});

app.delete("/entry/:id", async (req, res) => {
    try {
        const entryId = parseInt(req.params.id);
        const result = await entryCollection.deleteOne({ id: entryId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Entry not found" });
        }

        res.json({ success: true, message: "Entry deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete", error: error.message });
    }
});

app.get("/entry/:id", async (req, res) => {
    try {
        const entryId = parseInt(req.params.id);
        const entry = await entryCollection.findOne({ id: entryId });
        if (!entry) return res.status(404).json({ message: "Entry not found" });

        res.json({ success: true, entry });
    } catch (error) {
        res.status(500).json({ message: "Error fetching entry", error: error.message });
    }
});

app.put("/entry/:id", async (req, res) => {
    try {
        const entryId = parseInt(req.params.id);
        const { date, profName, roomNum, timeIn, timeOut } = req.body;

        const result = await entryCollection.updateOne(
            { id: entryId },
            { $set: { date, profName, roomNum, timeIn, timeOut } }
        );

        res.json({ success: true, message: "Entry updated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update entry", error: error.message });
    }
});

app.get("/profs", async (req, res) => {
    try {
        const profs = await userCollection
            .find({ isProf: true })
            .project({ firstName: 1, lastName: 1, _id: 1 }) 
            .toArray();

        res.json({ success: true, profs });
    } catch (error) {
        console.error("Error fetching professors:", error);
        res.status(500).json({ success: false, message: "Error fetching professors" });
    }
});

app.get("/profEntries", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Validate and convert userId to ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const userObjectId = new ObjectId(userId);
        
        // Check if user is a professor
        const prof = await userCollection.findOne({ _id: userObjectId });
        if (!prof || !prof.isProf) {
            return res.status(403).json({ success: false, message: "Forbidden: Not a professor" });
        }

        // Get entries where profId matches the current user's ObjectId
        const entries = await entryCollection.aggregate([
            { $match: { profId: userObjectId } }, // Match ObjectId to ObjectId
            {
                $lookup: {
                    from: "Users",
                    let: { uid: "$userId" }, // userId is stored as ObjectId in entries
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$uid"] } } }, // Compare ObjectId to ObjectId
                        { $project: { firstName: 1, lastName: 1, _id: 0 } }
                    ],
                    as: "student"
                }
            },
            { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    date: 1,
                    roomNum: 1,
                    timeIn: 1,
                    timeOut: 1,
                    profName: 1,
                    studentName: {
                        $cond: [
                            { $ifNull: ["$student", false] },
                            { $concat: ["$student.firstName", " ", "$student.lastName"] },
                            "Unknown Student"
                        ]
                    }
                }
            },
            { $sort: { date: -1, timeIn: -1 } }
        ]).toArray();


        res.json({ success: true, entries });
    } catch (error) {
        console.error("Error fetching professor entries:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//LOGOUT ROUTE
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
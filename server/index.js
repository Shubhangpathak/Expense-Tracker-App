const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const { UserModel } = require("./db");
const bcrypt = require('bcrypt');
const z = require('zod')
const jwt = require('jsonwebtoken');
const cors = require('cors')

const saltRounds = Number(process.env.SALT_ROUNDS);

const app = express()
app.use(express.json())

dotenv.config({ path: __dirname + '/../.env' });
const secretKey = process.env.TOKEN_SECRET;

mongoose.connect(process.env.MONGO_URL)
    .then(() => { return console.log('mongoDB Connected') })
    .catch((err) => console.log('MondoDB error:', err))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.post('/signup', async function (req, res) {
    try {
        const requiredBody = z.object({
            username: z.string().min(2).max(50),
            password: z.string().min(5).max(30)
        })
        const parseData = requiredBody.safeParse(req.body);

        console.log("Received body:", req.body);
        console.log("Username length:", req.body.username?.length);
        console.log("Password length:", req.body.password?.length);

        if (!parseData.success) {
            console.log("Validation error object:", parseData.error);

            const firstErrorMessage = parseData.error?.errors?.[0]?.message || "Unknown validation error";

            return res.status(400).json({
                status: "error",
                message: "Invalid input format",
                details: firstErrorMessage
            });
        }
        const { username, password } = parseData.data;
        console.log("parseData result:", parseData);


        const userExist = await UserModel.findOne({ username: username })
        if (userExist) {
            return res.status(400).json({
                status: "error",
                message: "username already exist"
            });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await UserModel.create({ username, password: hashedPassword });

        return res.status(201).json({
            status: "success",
            message: " your account has been created"
        });

    } catch (err) {
        console.error("Signup server error:", err);
        return res.status(500).json({
            status: "error",
            message: "server issue please try again later"
        });

    }
});

app.post('/signin', async function (req, res) {
    try {
        const requiredBody = z.object({
            username: z.string().min(2).max(50),
            password: z.string().min(5).max(30)
        })
        const parseDataWithSuccess = requiredBody.safeParse(req.body);
        if (!parseDataWithSuccess.success) {
            return res.status(400).json({
                status: "error",
                message: "invalid format",
                error: parseDataWithSuccess.error,
                reason: parseDataWithSuccess.error.errors[0].message
            });
        }
        const { username, password } = parseDataWithSuccess.data;

        const user = await UserModel.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ status: "error", error: "username doesnot exist" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ status: "error", message: "incorrect password" });
        } else if (matchPassword) {
            const token = jwt.sign({ id: user._id }, secretKey)
            console.log(token)
            return res.status(200).json({
                "login success": token,
            })
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ "error": "server issue please try again later" });
    }

});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const { UserModel } = require("./db");
const bcrypt = require('bcrypt');
const z = require("zod")
var jwt = require('jsonwebtoken');

const saltRounds = Number(process.env.SALT_ROUNDS);

const app = express()
app.use(express.json())

dotenv.config({ path: __dirname + '/../.env' });
const secretKey = process.env.TOKEN_SECRET;

mongoose.connect(process.env.MONGO_URL)
    .then(() => { return console.log('mongoDB Connected') })
    .catch((err) => console.log('MondoDB error:', err))

app.post('/signup', async function (req, res) {
    try {
        const requiredBody = z.object({
            username: z.string().min(2).max(50),
            password: z.string().min(5).max(30)
        })
        const parseDataWithSuccess = requiredBody.safeParse(req.body);
        if (!parseDataWithSuccess) {
            return res.status(400).json({
                message: "invalid format",
                error: parseResult.error,
                reason: parseResult.error.errors[0].message
            });
        }
        const { username, password } = parseDataWithSuccess.data;

        const userExist = await UserModel.findOne({ username: username })
        if (userExist) {
            return res.status(400).json({ "error": "username already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await UserModel.create({ username, password: hashedPassword });
        return res.status(200).json({ "success": "your account has been created" });

    } catch {
        return res.status(500).json({ "error": "server issue please try again later" });

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
                message: "invalid format",
                error: parseResult.error,
                reason: parseResult.error.errors[0].message
            });
        }
        const { username, password } = parseDataWithSuccess.data;

        const user = await UserModel.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ "error": "username doesnot exist" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: "incorrect password" });
        } else if (matchPassword) {
            const token = jwt.sign({ id: user._id }, secretKey)
            return res.status(200).json({
                "login success": token
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "server issue please try again later" });
    }


});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
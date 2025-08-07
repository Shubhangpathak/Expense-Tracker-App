const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config({ path: './.env' });
const { UserModel, ExpenseModel, BalanceModel } = require("./db");
const bcrypt = require('bcrypt');
const z = require('zod')
const jwt = require('jsonwebtoken');
const cors = require('cors')

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const app = express()
app.use(express.json())

console.log("Current working dir:", process.cwd());

// dotenv.config({ path: __dirname + '/../.env' });
const secretKey = process.env.TOKEN_SECRET;

mongoose.connect(process.env.MONGO_URL)
    .then(() => { return console.log('mongoDB Connected') })
    .catch((err) => console.log('MondoDB error:', err))

app.use(cors({
    origin: [
        'https://expense-tracker-app-delta-two.vercel.app'
    ],
    credentials: true
}))

//new addition 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("sturcture that i wanteed to see: \n", authHeader)
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({
            status: "error",
            message: "Acccess token required, login again"
        })
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: "error",
                message: "Invalid or expired token"
            });
        }
        req.ownerId = user.id; // Storing ownerId for later use
        next();
    })
}

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
            return res.status(400).json({
                status: "error",
                message: "username doesnot exist"
            });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({
                status: "error",
                message: "incorrect password"
            });
        } else if (matchPassword) {
            const token = jwt.sign({ id: user._id, username: user.username }, secretKey)
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

//adding new rotes
app.get("/balance", authenticateToken, async function (req, res) {
    try {
        let userBalance = await BalanceModel.findOne({ ownerId: req.ownerId });
        if (!userBalance) {
            userBalance = await BalanceModel.create({ ownerId: req.ownerId, currentBalance: 0 });
        }

        res.status(200).json({
            status: "success",
            balance: userBalance.currentBalance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
})

app.post("/expense", authenticateToken, async (req, res) => {

    try {
        const { amount, category, type, date, description } = req.body;

        if (!amount || !category || !type) {
            return res.status(400).json({
                status: "error",
                message: "Amount, category, and type are required"
            });
        }

        const expense = await ExpenseModel.create({
            ownerId: req.ownerId,
            amount: Math.abs(Number(amount)),
            category,
            type,
            date: date || new Date(),
            description: description || ''
        })

        // Update user balance
        let userBalance = await BalanceModel.findOne({ ownerId: req.ownerId });
        if (!userBalance) {
            userBalance = await BalanceModel.create({
                ownerId: req.ownerId,
                currentBalance: 0
            });
        }
        //adjust balance acc to type
        const balanceChange = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
        userBalance.currentBalance += balanceChange;

        await userBalance.save();
        res.status(201).json({
            status: "success",
            message: "Expense added successfully",
            expense,
            newBalance: userBalance.currentBalance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
})

//list expense router
app.get("/expenses", authenticateToken, async (req, res) => {
    try {
        const expenses = await ExpenseModel.find({ ownerId: req.ownerId })
            .sort({ date: -1 }); // Most recent first

        res.status(200).json({
            status: "success",
            expenses
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
})

app.delete("/delete", authenticateToken, async (req, res) => {
    try {
        const expenseId = req.body.id;
        if (!expenseId) {
            return res.status(400).json({
                status: "error",
                message: "selected item id required for deletion"
            })
        }
        const expense = await ExpenseModel.findOne({ _id: expenseId, ownerId: req.ownerId });
        if (!expense) {
            return res.status(400).json({
                status: "error",
                message: "selected expense not found"
            })
        }

        //remove expense from table 
        await ExpenseModel.deleteOne({ _id: expenseId, ownerId: req.ownerId });

        // imported users balance
        let userBalance = await BalanceModel.findOne({ ownerId: req.ownerId });
        if (!userBalance) {
            return res.status(400).json({
                status: "error",
                message: "No balance record found"
            });
        }

        //removes amount only if expense or balance
        if (expense.type === 'expense') {
            userBalance.currentBalance += Math.abs(expense.amount);
        }
        else if (expense.type === 'income') {
            userBalance.currentBalance -= Math.abs(expense.amount)
        }
        await userBalance.save();

        return res.status(200).json({
            status: "success",
            message: "Expense deleted and balance updated",
            newBalance: userBalance.currentBalance
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }

})
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
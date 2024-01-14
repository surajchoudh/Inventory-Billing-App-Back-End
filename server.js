const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Import the connectDB function
const errorHandler = require('./middleware/errorMiddleware');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const invoiceRoutes = require('./routes/invoiceRoutes');
const bcrypt = require('bcryptjs');



const app = express();
const inventoryRoutes = require('./routes/inventoryRoutes');
const authRoutes = require('./routes/authRoutes');




app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use(errorHandler);

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received login request with data:', { email, password });

        // Find the user by email
        const user = await User.findOne({ email });


        // If user not found or password doesn't match, return an error
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        console.log('Login successful');
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Connect to MongoDB by invoking the connectDB function
connectDB();

app.use('/api/inventory', inventoryRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/invoice', invoiceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

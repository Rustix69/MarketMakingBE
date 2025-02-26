require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define the POST API endpoint to save scores
app.post('/api/submit', async (req, res) => {
    const { name, pl } = req.body;

    try {
        const { data, error } = await supabase
            .from('contest') // Change 'contest' to your actual table name
            .insert([{ name, pl }])
            .select();

        if (error) throw error;

        res.status(201).json({ message: 'Score saved successfully', data });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ message: 'Error saving score', error: error.message });
    }
});

// Define the GET API endpoint to retrieve all scores
app.get('/api/scores', async (req, res) => {
    try {
        const { data, error } = await supabase.from('contest').select('*'); // Fetch all rows

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving scores:', error);
        res.status(500).json({ message: 'Error retrieving scores', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

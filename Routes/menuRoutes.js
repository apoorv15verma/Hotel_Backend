const express=require('express')
const router = express.Router();
const MenuItems = require('../models/menu');


router.post('', async function (req, res) {
    try {
        const data = req.body;
        const newMenuItems = new MenuItems(data);
        // Save the new person to the database using await
        const response = await newMenuItems.save();
        console.log('Saved MenuItems to database');
        res.status(201).json(response);
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('', async (req, res) => {
    try {
        const data = await MenuItems.find();
        console.log('data fetched')
        res.status(200).json(data);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internnal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedData = req.body;

        const data = await MenuItems.findByIdAndUpdate(menuId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!data) {
            return res.status(404).json({ error: 'menu not found' });
        }

        console.log('Data updated');
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;


        const data = await MenuItems.findByIdAndDelete(menuId);

        if (!data) {
            return res.status(404).json({ error: 'menu not found' });
        }

        console.log('Data deleted');
        res.status(200).json({ massage: 'menu deleted succesfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=router;
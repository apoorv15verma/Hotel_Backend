const express = require('express')
const router = express.Router();
const Person = require('../models/person')
router.post('', async function (req, res) {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        // Save the new person to the database using await
        const response = await newPerson.save();
        console.log('Saved person to database');
        res.status(201).json(response);
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internnal server error' });
    }
})

router.get('/:workType', async (req, res) => {
    try {

        const workType = req.params.workType;

        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {

            const data = await Person.find({ work: workType });
            console.log('response fetched')
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'invalid worktype' });
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internnal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const data = await Person.findByIdAndUpdate(personId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!data) {
            return res.status(404).json({ error: 'Person not found' });
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
        const personId = req.params.id;
        

        const data = await Person.findByIdAndDelete(personId);

        if (!data) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data deleted');
        res.status(200).json({massage:'person deleted succesfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// router.put(':id', async (req, res) => {
//     try {
//         const personId = req.params.id;
//         const updatedData = req.body;


//         const data = await Person.findByIdAndUpdate(personId,updatedData,{
//             new:true,
//             runValidators:true,
//         });

//         if (!personId) {
//             return res.status(404).json({ error: 'Person not found' });
//             }
//         console.log('data updated')
//         res.status(200).json(data);


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'internnal server error' });
//     }
// })

module.exports = router;
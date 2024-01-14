// Import the Inventory model (assuming it's defined in 'models/Inventory.js')
const Inventory = require('../models/inventory');

// Controller methods for handling inventory operations
exports.getAllInventory = async (req, res) => {
    try {
        // Fetch all inventory items from the database
        const allInventory = await Inventory.find();
        res.status(200).json(allInventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInventoryById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find a specific inventory item by ID
        const inventoryItem = await Inventory.findById(id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json(inventoryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInventoryItem = async (req, res) => {
    const { name, quantity, price } = req.body;
    try {
        // Create a new inventory item in the database
        const newInventoryItem = await Inventory.create({
            name,
            quantity,
            price,
        });
        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    try {
        // Update an existing inventory item by ID
        const updatedInventoryItem = await Inventory.findByIdAndUpdate(
            id,
            { name, quantity, price },
            { new: true } // Return the updated item
        );
        if (!updatedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json(updatedInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    const { id } = req.params;
    try {
        // Delete an inventory item by ID
        const deletedInventoryItem = await Inventory.findByIdAndDelete(id);
        if (!deletedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

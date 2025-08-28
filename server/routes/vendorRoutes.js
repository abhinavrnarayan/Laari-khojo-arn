import express from 'express';
import Vendor from '../models/Vendor.js';

const router = express.Router();

const isInactive = (lastActive) => {
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
  return (Date.now() - new Date(lastActive).getTime()) > THREE_DAYS_MS;
};

// GET /vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ updatedAt: -1 });
    const withStatus = vendors.map(v => ({
      ...v.toObject(),
      status: isInactive(v.lastActive) ? 'Inactive' : 'Active'
    }));
    res.json(withStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// POST /vendors
router.post('/', async (req, res) => {
  try {
    const { name, contactNumber, location, lastActive } = req.body;
    const vendor = await Vendor.create({
      name,
      contactNumber,
      location,
      lastActive: lastActive ? new Date(lastActive) : new Date()
    });
    const withStatus = { ...vendor.toObject(), status: 'Active' };
    res.status(201).json(withStatus);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create vendor', details: err.message });
  }
});

// PATCH /vendors/:id/active  -> sets lastActive to now
router.patch('/:id/active', async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { lastActive: new Date() },
      { new: true }
    );
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    const withStatus = {
      ...vendor.toObject(),
      status: 'Active'
    };
    res.json(withStatus);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update lastActive' });
  }
});

export default router;

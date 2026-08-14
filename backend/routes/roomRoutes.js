const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRooms,
  getSingleRoom,
  getOwnerRooms,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

// Public route to get all rooms & Private route to create a room
router.route('/').get(getRooms).post(protect, createRoom);

// Owner's rooms route (MUST be placed before /:id route)
router.get('/owner/my', protect, getOwnerRooms);

// Single room routes (by ID)
router
  .route('/:id')
  .get(getSingleRoom)
  .put(protect, updateRoom)
  .delete(protect, deleteRoom);

module.exports = router;

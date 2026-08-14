const mongoose = require('mongoose');
const Room = require('../models/Room');

// @desc    Create a new room listing
// @route   POST /api/rooms
// @access  Private (Owner only)
const createRoom = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.user?.id || req.user?._id || req.body.owner;

    if (!ownerId) {
      return res.status(400).json({
        success: false,
        message: 'Owner ID is required to create a room listing. Please ensure you are logged in as an owner.',
      });
    }

    if (req.user && req.user.role && req.user.role !== 'owner') {
      return res.status(403).json({
        success: false,
        message: 'Only property owners can create room listings',
      });
    }

    const {
      title,
      description,
      location,
      city,
      price,
      roomType,
      propertyType,
      images,
      amenities,
      available,
    } = req.body;

    if (!title || !description || !location || !city || !price || !roomType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required room details (title, description, location, city, price, roomType)',
      });
    }

    const room = await Room.create({
      title,
      description,
      location,
      city,
      price: Number(price),
      roomType,
      propertyType: propertyType || 'Room',
      images: images || [],
      amenities: amenities || [],
      available: available !== undefined ? available : true,
      owner: ownerId,
    });

    return res.status(201).json({
      success: true,
      message: 'Room added successfully',
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating room',
    });
  }
};

// @desc    Get all rooms with optional filters
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  try {
    const { city, roomType, minPrice, maxPrice, search } = req.query;

    const query = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (roomType) {
      query.roomType = roomType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const rooms = await Room.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching rooms',
    });
  }
};

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
const getSingleRoom = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID format',
      });
    }

    const room = await Room.findById(req.params.id).populate('owner', 'name email role');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching room details',
    });
  }
};

// @desc    Get owner's rooms
// @route   GET /api/rooms/owner/my
// @access  Private (Owner only)
const getOwnerRooms = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.user?.id || req.user?._id || req.query.ownerId;
    if (!ownerId) {
      return res.status(400).json({
        success: false,
        message: 'Owner ID missing from token or query parameters.',
      });
    }

    const rooms = await Room.find({ owner: ownerId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching owner's rooms",
    });
  }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private (Owner only - creator only)
const updateRoom = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID format',
      });
    }

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    if (room.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this room. You are not the owner.',
      });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      room: updatedRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating room',
    });
  }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private (Owner only - creator only)
const deleteRoom = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID format',
      });
    }

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    if (room.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this room. You are not the owner.',
      });
    }

    await room.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error deleting room',
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getSingleRoom,
  getOwnerRooms,
  updateRoom,
  deleteRoom,
};

const Note = require('../models/Note');

// POST /api/notes
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                error: 'Title and content are required',
            });
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user.id, // ownership enforced here
        });

        return res.status(201).json({
            message: 'Note created successfully',
            note,
        });
    } catch (error) {
        console.error('Create note error:', error.message);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};

// GET /api/notes
const getMyNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const notes = await Note.find({ owner: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Note.countDocuments({ owner: req.user.id });

        res.status(200).json({
            page,
            limit,
            total,
            count: notes.length,
            notes,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /api/notes/:id
const getSingleNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: 'Note not found',
            });
        }

        // Ownership check
        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({
                error: 'Access denied',
            });
        }

        return res.status(200).json(note);
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid note ID',
        });
    }
};

// PUT /api/notes/:id
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: 'Note not found',
            });
        }

        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({
                error: 'Access denied',
            });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        const updatedNote = await note.save();

        return res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid note ID',
        });
    }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                error: 'Note not found',
            });
        }

        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({
                error: 'Access denied',
            });
        }

        await note.deleteOne();

        return res.status(200).json({
            message: 'Note deleted successfully',
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid note ID',
        });
    }
};

module.exports = {
    createNote,
    getMyNotes,
    getSingleNote,
    updateNote,
    deleteNote,
};

const validator = require('validator');

function validateRoomCreate(req, res, next) {
    let { name, description, isPublic, joinCode } = req.body || {};

    if (!name || typeof name !== 'string' || validator.isEmpty(name.trim())) {
        return res.status(400).json({ error: 'Room name is required' });
    }

    // Normalize & sanitize name
    name = name.trim();
    if (name.length > 100) {
        return res.status(400).json({ error: 'Room name too long (max 100 chars)' });
    }

    // coerce isPublic to boolean
    if (typeof isPublic === 'string') {
        if (isPublic === 'true') isPublic = true;
        else if (isPublic === 'false') isPublic = false;
    }

    if (typeof isPublic !== 'boolean') {
        return res.status(400).json({ error: 'isPublic must be boolean' });
    }

    // joinCode rules for private rooms
    // joinCode rules for private rooms
    if (!isPublic) {
        // Optional: if provided, validate it. If missing, backend will auto-gen.
        if (joinCode && typeof joinCode === 'string' && !validator.isEmpty(joinCode.trim())) {
            joinCode = joinCode.trim();
            if (joinCode.length < 4 || joinCode.length > 32) {
                return res.status(400).json({ error: 'Join code must be 4–32 characters' });
            }
        } else {
            joinCode = null;
        }
    } else {
        joinCode = null;
    }

    // sanitize
    req.body.name = validator.escape(name);
    if (description && typeof description === 'string') {
        const descTrim = description.trim().slice(0, 500);
        req.body.description = validator.escape(descTrim);
    } else {
        req.body.description = null;
    }
    req.body.isPublic = isPublic;
    if (joinCode) {
        req.body.joinCode = validator.escape(joinCode);
    } else {
        req.body.joinCode = null;
    }

    next();
}

module.exports = {
    validateRoomCreate
};

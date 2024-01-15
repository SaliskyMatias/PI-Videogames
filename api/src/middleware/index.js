const validatePost = (req, res, next) => {
    const { name, description, platforms, background_image, released, rating, genres } = req.body;

    if( !name) {
        return res.status(400).json({ error: 'Please enter a name' });
    }  

    if (!description) {
        return res.status(400).json({ error: 'Please enter a description' });
    } 

    if (!platforms) {
        return res.status(400).json({ error: 'Please enter platforms' });
    }  

    if (!background_image) {
        return res.status(400).json({ error: 'Please enter a image' });
    } 

    if (!released) {
        return res.status(400).json({ error: 'Please enter a released date' });
    } 
    
    if (!rating) {
        return res.status(400).json({ error: 'Please enter a rating' });
    }  
    
    if (!genres) {
        return res.status(400).json({ error: 'Please enter a genre' });
    } 
    next();
}

module.exports = validatePost
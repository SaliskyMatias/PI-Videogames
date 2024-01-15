const validation = (form) => {
    const errors = {};

    if(!form.name) {
        errors.name = 'Name is required, please fill this field';
    } else if(form.name.length < 3) {
        errors.name = 'Name must have at least 3 characters';
    } else if(form.name.length > 20) {
        errors.name = 'Name must be fewer than 20 characters';
    }

    if(!form.background_image) {
        errors.background_image = 'Image is required, please fill this field'
    } else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.background_image)) {
        errors.background_image = 'Please enter a valid URL for the image';
    }

    if(!form.description) {
        errors.description = 'Description is required, please fill this field';
    } else if(form.description.length < 6) {
        errors.description = 'Description must have at least 6 characters';
    }

    if(!form.platforms || form.platforms.length === 0) {
        errors.platforms = 'Platforms is required, please fill this field';
    }

    if(!form.released) {
        errors.released = 'Released is required, please fill this field';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.released)) {
        errors.released = 'Please enter a valid date';
    }

    if(!form.rating) {
        errors.rating = 'Rating is required, please fill this field';
    } else if(!/^(?:[1-4](\.\d{1,2})?|5(?:\.0{1,2})?)$/.test(form.rating)) {
        errors.rating = 'Rating must be between 1 and 5';
    }

    if(!form.genres || form.genres.length === 0) {
        errors.genres = 'Genres is required, please fill this field';
    }

    return errors;
}

export default validation;

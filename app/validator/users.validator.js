const Joi = require('joi');

exports.login = async (dto) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }).required();

    try {
        const response = await schema.validateAsync(dto);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.Create = async (dto) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        photo: Joi.string()
    }).required();

    try {
        const response = await schema.validateAsync(dto);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.readById = async (dto) => {

    const schema = Joi.object({
        uid: Joi.string().guid({ version: ['uuidv4']})
    }).required();

    try {
        const response = await schema.validateAsync(dto);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.updateProfileHR = async (dto) => {

    const schema = Joi.object({
        uid: Joi.string().guid({ version: ['uuidv4']}).required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        photo: Joi.string(),
    })
    .required();

    try {
        const response = await schema.validateAsync(dto);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.updateProfileEmployee = async (dto) => {

    const schema = Joi.object({
        uid: Joi.string().guid({ version: ['uuidv4']}),
        password: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        photo: Joi.string(),
    }).required();

    try {
        const response = await schema.validateAsync(dto);
        return response;
    } catch (error) {
        throw error;
    }
};


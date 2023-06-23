import ClientModel from '../schemas/client.schema.js';
import { getGame } from './game.service.js';

export const getClient = async (id) => {
    try {
        return await ClientModel.findById(id);
    } catch (e) {
        throw Error('There is no client with that Id');
    }
}

export const getCategories = async function () {
    try {
        return await ClientModel.find().sort('name');
    } catch (e) {
        throw Error('Error fetching categories');
    }
}

export const updateClient = async (id, name) => {
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            throw Error('There is no client with that Id');
        }    
        return await ClientModel.findByIdAndUpdate(id, {name});
    } catch (e) {
        throw Error(e);
    }
}

export const deleteClient = async (id) => {
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            throw 'There is no client with that Id';
        }
        const games = await getGame({client});
        if(games.length > 0) {
            throw 'There are games related to this client';
        }
        return await ClientModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error(e);
    }
}


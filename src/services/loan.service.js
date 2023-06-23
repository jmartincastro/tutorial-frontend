import LoanModel from '../schemas/loan.schema.js';
import { getGame } from './game.service.js';
import { getClient } from './client.service.js';

export const getLoans = async (game, client, date) => {
    try {

        list = []
        if (game != null) {
            dictGame = { game: game };
            list.push(dictGame);
        }
        if (client != null) {
            dictClient = { client: client };
            list.push(dictClient);
        }
        if (date != null) {
            dicttDate = { date: date };
            list.push(dicttDate);
        }

        const find = null;

        if (list.length > 0)
            find = { $and: list };
            
        return await LoanModel.find(find).sort('id').populate('client').populate('game');
    } catch (e) {
        throw Error('Error fetching loans');
    }
}

export const createLoan = async (data) => {
    try {
        const game = await getGame(data.game.id);
        if (!game) {
            throw Error('There is no game with that Id');
        }

        const client = await getAuthor(data.client.id);
        if (!client) {
            throw Error('There is no client with that Id');
        }

        const loan = new LoanModel({
            ...data,
            game: data.game.id,
            client: data.client.id,
        });
        return await loan.save();
    } catch (e) {
        throw Error(e);
    }
}

export const updateLoan = async (id, data) => {
    try {

        const game = await getGame(data.game.id);
        if (!game) {
            throw Error('There is no game with that Id');
        }

        const client = await getAuthor(data.client.id);
        if (!client) {
            throw Error('There is no client with that Id');
        }

        const loanToUpdate = {
            ...data,
            category: data.category.id,
            author: data.author.id,
        };

        return await LoanModel.findByIdAndUpdate(id, loanToUpdate, { new: false });
    } catch (e) {
        throw Error(e);
    }
}

export const deleteLoan = async (id) => {
    try {
        const loan = await LoanModel.findById(id);
        if (!loan) {
            throw 'There is no loan with that Id';
        }
        const games = await getGame({ loan });
        if (games.length > 0) {
            throw 'There are games related to this loan';
        }
        const clients = await getClient({ loan });
        if (clients.length > 0) {
            throw 'There are clients related to this loan';
        }
        return await LoanModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error(e);
    }
}

export const getLoansPageable = async (gameToFind, clientToFind, date, page, limit, sort) => {
    const sortObj = {
        [sort?.property || 'id']: sort?.direction === 'DESC' ? 'DESC' : 'ASC'
    };
    try {
        const options = {
            page: parseInt(page) + 1,
            limit,
            sort: sortObj
        };

        return await LoanModel.paginate({}, options);
    } catch (e) {
        throw Error('Error fetching loans page');
    }
}

export const getLoan = async (id) => {
    try {
        return await LoanModel.findById(id);
    } catch (e) {
        throw Error('There is no loan with that Id');
    }
}
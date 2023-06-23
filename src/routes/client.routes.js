import { Router } from 'express';
import { createClient, getCategories, updateClient, deleteClient } from '../controllers/client.controller.js';

const clientRouter = Router();

clientRouter.put('/:id', [
    check('name').not().isEmpty(),
    validateFields
], updateClient);

clientRouter.put('/', [
    check('name').not().isEmpty(),
    validateFields
], createClient);

clientRouter.get('/', getCategories);
clientRouter.delete('/:id', deleteClient);

export default clientRouter;
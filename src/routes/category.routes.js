import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.put('/:id', [
    check('name').not().isEmpty(),
    validateFields
], updateCategory);

categoryRouter.put('/', [
    check('name').not().isEmpty(),
    validateFields
], createCategory);

categoryRouter.get('/', getCategories);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
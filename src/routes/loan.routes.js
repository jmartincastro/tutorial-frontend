import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields.js';
import { createLoan, deleteLoan, getLoans, updateLoan, getLoansPageable } from '../controllers/loan.controller.js';
const loanRouter = Router();

loanRouter.put('/:id', [
    check('startDate').not().isEmpty(),
    check('endDate').not().isEmpty(),
    validateFields
], updateLoan);

loanRouter.put('/', [
    check('startDate').not().isEmpty(),
    check('endDate').not().isEmpty(),
    validateFields
], createLoan);

loanRouter.get('/', getLoans);
loanRouter.delete('/:id', deleteLoan);

loanRouter.post('/', [
    check('pageable').not().isEmpty(),
    check('pageable.pageSize').not().isEmpty(),
    check('pageable.pageNumber').not().isEmpty(),
    validateFields
], getLoansPageable)

export default loanRouter;
import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middleware/validate-fields';
import {
  addSpecialtyController,
  deleteSpecialityController,
  editSpecialtyController,
  getSpecialtiesController,
} from '../controllers/specialties';
import { existsSpecialityById } from '../utils/db-validators';

const router = Router();

router.post(
  '/',
  [
    check('title', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('la especialidad debe tener más de 3 caracteres'),
    validateFields,
  ],
  addSpecialtyController
);

router.get('/', getSpecialtiesController);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsSpecialityById),
    check('title', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('la especialidad debe tener más de 3 caracteres'),
    validateFields,
  ],
  editSpecialtyController
);

router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsSpecialityById),
    validateFields,
  ],
  deleteSpecialityController
);

export { router };

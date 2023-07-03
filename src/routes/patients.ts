import { Router } from 'express';

import { check } from 'express-validator';

import {
  deletePatient,
  getPatient,
  getPatients,
  postPatient,
  updatePatient,
} from '../controllers/patient';

import { checkJwt } from '../middleware/session';
import { checkPermissions } from '../middleware/checkPermissions';
import { validateFields } from '../middleware/validate-fields';

import { existsPatientById } from '../utils/db-validators';
import { phoneNumberRegex } from '../utils/customRegex';

const router = Router();

router.get(
  '/',
  [checkJwt, checkPermissions(['USER_ROLE']), validateFields],
  getPatients
);

router.get(
  '/:id',
  [checkJwt, checkPermissions(['USER_ROLE']), validateFields],
  getPatient
);

router.post(
  '/',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('name', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener más de 3 caracteres'),
    check('last_name', 'El apellido es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El apellido debe tener más de 3 caracteres'),
    check('identification', 'El Numero de identificación es obligatorio')
      .not()
      .isEmpty(),
    check('age', 'La edad es obligatoria')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('La edad debe ser un numero')
      .isInt({ min: 0, max: 120 })
      .withMessage('La edad debe estar entre 0 y 120'),
    check('phone', 'El telefono es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 7, max: 15 })
      .withMessage('El telefono debe tener entre 7 y 15 caracteres')
      .matches(phoneNumberRegex)
      .withMessage('El teléfono no es válido'),

    validateFields,
  ],
  postPatient
);

router.put(
  '/:id',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsPatientById),
    check('name', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener más de 3 caracteres'),
    check('last_name', 'El apellido es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El apellido debe tener más de 3 caracteres'),
    check('age', 'La edad es obligatoria')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('La edad debe ser un numero')
      .isInt({ min: 0, max: 120 })
      .withMessage('La edad debe estar entre 0 y 120'),
    check('phone', 'El telefono es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 7, max: 15 })
      .withMessage('El telefono debe tener entre 7 y 15 caracteres')
      .matches(phoneNumberRegex)
      .withMessage('El teléfono no es válido'),
    validateFields,
  ],
  updatePatient
);

router.delete(
  '/:id',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsPatientById),
    validateFields,
  ],
  deletePatient
);

export { router };

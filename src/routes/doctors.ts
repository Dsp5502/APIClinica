import { Router } from 'express';

import { check } from 'express-validator';

import { checkJwt } from '../middleware/session';
import { checkPermissions } from '../middleware/checkPermissions';
import { validateFields } from '../middleware/validate-fields';

import {
  deleteDoctor,
  getDoctor,
  getDoctors,
  postDoctor,
  updateDoctor,
} from '../controllers/doctor';
import {
  emailDoctorExists,
  existsDoctorById,
  existsSpecialityById,
} from '../utils/db-validators';

const router = Router();

router.get(
  '/',
  [checkJwt, checkPermissions(['USER_ROLE']), validateFields],
  getDoctors
);

router.get(
  '/:id',
  [checkJwt, checkPermissions(['USER_ROLE']), validateFields],
  getDoctor
);

router.post(
  '/',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('firstName', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener más de 3 caracteres'),
    check('lastName', 'El apellido es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El apellido debe tener más de 3 caracteres'),
    check('specialtyId', 'La especialidad es obligatoria').isMongoId(),
    check('specialtyId').custom(existsSpecialityById),
    check('office', 'La oficina es obligatoria')
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check('contactEmail', 'El correo es obligatorio').isEmail(),
    check('contactEmail').custom(emailDoctorExists),
    validateFields,
  ],
  postDoctor
);
router.put(
  '/:id',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsDoctorById),
    check('firstName', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener más de 3 caracteres'),
    check('lastName', 'El apellido es obligatorio')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('El apellido debe tener más de 3 caracteres'),
    check('specialtyId', 'La especialidad es obligatoria').isMongoId(),
    check('specialtyId').custom(existsSpecialityById),
    check('office', 'La oficina es obligatoria')
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    validateFields,
  ],
  updateDoctor
);
router.delete(
  '/:id',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsDoctorById),
    validateFields,
  ],
  deleteDoctor
);

export { router };

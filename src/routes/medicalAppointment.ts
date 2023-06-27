import { Router } from 'express';

import { check } from 'express-validator';
import {
  getMedicalAppointments,
  getMedicalAppointment,
  postMedicalAppointment,
  deleteMedicalAppointment,
} from '../controllers/medicalAppointment';
import { checkJwt } from '../middleware/session';
import { checkPermissions } from '../middleware/checkPermissions';
import { validateFields } from '../middleware/validate-fields';
import {
  PatientIdentificationExists,
  existsMedicalAppointmentById,
} from '../utils/db-validators';

const router = Router();

router.get(
  '/',
  [checkJwt, checkPermissions(['USER_ROLE']), validateFields],
  getMedicalAppointments
);
router.get(
  '/:id',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields,
  ],
  getMedicalAppointment
);
router.post(
  '/',
  [
    checkJwt,
    checkPermissions(['USER_ROLE']),
    check('documentPatient', 'El numero de documento es obligatorio')
      .not()
      .isEmpty(),
    check('documentPatient').custom(PatientIdentificationExists),
    check('specialtyId', 'La especialidad es obligatoria')
      .not()
      .isEmpty()
      .isMongoId(),
    check('appointmentDate', 'La fecha de la cita es obligatoria')
      .not()
      .isEmpty()
      .withMessage('La fecha debe ser valida'),
    check('doctorId', 'El doctor es obligatorio').not().isEmpty().isMongoId(),
    validateFields,
  ],
  postMedicalAppointment
);

router.delete(
  '/:id',
  [
    checkJwt,
    checkPermissions([]),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsMedicalAppointmentById),
    validateFields,
  ],
  deleteMedicalAppointment
);

export { router };

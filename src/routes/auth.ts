import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middleware/validate-fields';

import { LoginController, RegisterController } from '../controllers/auth';

import { emailExists, isRoleValid } from '../utils/db-validators';

const router = Router();

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({
      min: 6,
    }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  RegisterController
);

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
  ],
  LoginController
);

export { router };

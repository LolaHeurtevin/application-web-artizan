import { isLength } from 'validator'

const validateRegisterForm = (formData) => {
  const errors = {}
  if (typeof formData === 'object') {
    // Checking First name
    if (!isLength(formData.firstName, { min: 2, max: undefined })) { errors.firstName = 'First name is invalid' }
    if (!isLength(formData.lastName, { min: 2, max: undefined })) { errors.lastName = 'Last name is invalid' }

    return errors
  } else {
    throw new Error('Invalid parameter type')
  }

  // return errors
  // jean : tester de retourner des trucs dans chaque chaque condition
}

export {
  validateRegisterForm
}

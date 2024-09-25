const validarEmail = (email) => {
  // Expresión regular para validar un correo electrónico
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

export { validarEmail }

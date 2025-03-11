export const validations = {
  username: (value: string) => {
    console.log("Validando username:", value);
    if (!value.trim()) return "El nombre de usuario es obligatorio.";
    if (value.length < 3 || value.length > 20)
      return "El nombre de usuario debe tener entre 3 y 20 caracteres.";
    return null;
  },
  bio: (value: string) => {
    if (value.length > 120)
      return "La biografía no puede exceder los 120 caracteres.";
    return null;
  },
  email: (value: string) => {
    if (!value.trim()) return "El correo electrónico es obligatorio.";
    if (!value.includes("@") || !value.includes("."))
      return "El correo electrónico no es válido.";
    return null;
  },
  password: (value: string) => {
    if (!value.trim()) return "La contraseña es obligatoria.";
    if (value.length < 6 || value.length > 100)
      return "La contraseña debe tener entre 6 y 100 caracteres.";
    return null;
  },
  passwordCheck: (value: string, compareValue: string) => {
    if (!value.trim()) return "Confirma tu contraseña.";
    if (value !== compareValue) return "Las contraseñas no coinciden.";
    return null;
  },
  resetCode: (value: string) => {
    if (!value.trim()) return "Por favor, ingresa el código de verificación.";
    if (!/^\d{6}$/.test(value)) return "El código debe tener 6 dígitos.";
    return null;
  },
  name: (value: string) => {
    if (!value.trim()) return "El nombre completo es obligatorio.";
    if (value.length < 3 || value.length > 50)
      return "El nombre completo debe tener entre 3 y 50 caracteres.";
    return null;
  },
};

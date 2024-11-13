// globalState.ts
declare global {
  // Evitar conflictos si este archivo se importa varias veces en tiempo de desarrollo
  var admin: boolean | undefined;
}

// Mantener `admin` en el ámbito global de Node para evitar el reinicio
global.admin = global.admin ?? false;

export const getAdmin = (): boolean => {
  console.log(`Obteniendo admin desde global: ${global.admin}`);
  return global.admin as boolean;
};

export const setAdmin = (value: boolean): void => {
  global.admin = value;
  console.log(`Actualizando admin en global: ${global.admin}`);
};

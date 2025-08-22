export const getBaseStatusName = (status: string) => {
  if (status === 'active') {
    return 'Activo'
  }
  if (status === 'inactive') {
    return 'Inactivo'
  }
  if (status === 'deleted') {
    return 'Eliminado'
  }
  return 'Desconocido'
}

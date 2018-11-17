const HOST = "http://marketing-back.test";
const AC_ESTUDIANTES = `${HOST}/api/estudiante/:id`
const ADD_ESTUDIANTES = `${HOST}/api/estudiante`
const LISTAR_EMPRESARIO = `${HOST}/api/empresario`
const ELIMINAR_EDITAR_EMPRESARIO = `${HOST}/api/empresario/:id`
const ME = `${HOST}/api/auth/me`
const DATOS_INICIALES_PLAN = `${HOST}/api/marketing`
const ELIMINAR_DATOS_INICIALES_PLAN = `${HOST}/api/marketing/:id`
export {
    HOST,
    AC_ESTUDIANTES,
    ADD_ESTUDIANTES,
    LISTAR_EMPRESARIO,
    ELIMINAR_EDITAR_EMPRESARIO,
    ME,
    DATOS_INICIALES_PLAN,
    ELIMINAR_DATOS_INICIALES_PLAN
};
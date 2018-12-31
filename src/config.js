const HOST = "http://marketing.test";
const AC_ESTUDIANTES = `${HOST}/api/estudiante/:id`
const ADD_ESTUDIANTES = `${HOST}/api/estudiante`
const LISTAR_EMPRESARIO = `${HOST}/api/empresario`
const ELIMINAR_EDITAR_EMPRESARIO = `${HOST}/api/empresario/:id`
const ME = `${HOST}/api/auth/me`
const DATOS_INICIALES_PLAN = `${HOST}/api/marketing`
const ELIMINAR_DATOS_INICIALES_PLAN = `${HOST}/api/marketing/:id`
const ADD_ANALISIS_CLIENTES = `${HOST}/api/marketing/:id/clientes`
const ADD_ANSOFF = `${HOST}/api/marketing/:id/ansoff`
const ADD_BCG = `${HOST}/api/marketing/:id/bcg`
const ADD_COATROP = `${HOST}/api/marketing/:id/coatrop`
const ADD_COMPETENCIA = `${HOST}/api/marketing/:id/competencia`
const ADD_DOFA = `${HOST}/api/marketing/:id/dofa`
const ADD_HISTORIA = `${HOST}/api/marketing/:id/historia`
const ADD_MEFI = `${HOST}/api/marketing/:id/mefi`
const ADD_PEST = `${HOST}/api/marketing/:id/pest`
const ADD_PORTER = `${HOST}/api/marketing/:id/porter`
const ADD_PRESENTACION = `${HOST}/api/marketing/:id/presentacion`
const ADD_PROVEEDORES = `${HOST}/api/marketing/:id/proveedores`
const ADD_PLAN_MEDIOS = `${HOST}/api/medios`
const ELIMINAR_PLAN_MEDIOS = `${HOST}/api/medios/:id`
const ADD_OBJETIVOS = `${HOST}/api/objetivos`
const ELIMINAR_OBJETIVOS = `${HOST}/api/objetivos/:id`
const ADD_PLAN_ACCION = `${HOST}/api/estrategias`
const ELIMINAR_PLAN_ACCION = `${HOST}/api/estrategias/:id`
const ADD_ANEXOS = `${HOST}/api/files`
const VER_PLANES_MARKETING = `${HOST}/api/admin/marketing`

export {
    HOST,
    AC_ESTUDIANTES,
    ADD_ESTUDIANTES,
    LISTAR_EMPRESARIO,
    ELIMINAR_EDITAR_EMPRESARIO,
    ME,
    DATOS_INICIALES_PLAN,
    ELIMINAR_DATOS_INICIALES_PLAN,
    ADD_ANALISIS_CLIENTES,
    ADD_ANSOFF,
    ADD_BCG,
    ADD_COATROP,
    ADD_COMPETENCIA,
    ADD_DOFA,
    ADD_HISTORIA,
    ADD_MEFI,
    ADD_PEST,
    ADD_PORTER,
    ADD_PRESENTACION,
    ADD_PROVEEDORES,
    ADD_PLAN_MEDIOS,
    ELIMINAR_PLAN_MEDIOS,
    ADD_OBJETIVOS,
    ELIMINAR_OBJETIVOS,
    ADD_PLAN_ACCION,
    ELIMINAR_PLAN_ACCION,
    ADD_ANEXOS,
    VER_PLANES_MARKETING
};
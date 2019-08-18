import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Spin,
    message
} from 'antd';
import TablaEmpresario from './TablaEmpresario';
import { LISTAR_EMPRESARIO, ELIMINAR_EDITAR_EMPRESARIO } from '../../config';
import axios from 'axios';


const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {
        render() {


            function handleChange(value) {

            }

            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Agregar nuevo empresario"
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                        <FormItem label="Nombres">
                            {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Por favor ingrese el nombre' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Apellidos">
                            {getFieldDecorator('apellido', {
                                rules: [{ required: true, message: 'Por favor ingrese el apellido' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Correo">
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'Ingrese un correo válido',
                                }, {
                                    required: true, message: 'Por favor ingrese el correo',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Contraseña">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Por favor ingrese la contraseña' }],
                            })(<Input />)}
                        </FormItem>
                        <div style={{ display: 'inline-block' }}>
                            <FormItem label="Año">
                                {getFieldDecorator('year', {
                                    rules: [{ required: true, message: 'Ingrese el año' }],
                                })(<Input style={{ width: '100px', marginRight: '3%' }} />)}
                            </FormItem>
                        </div>

                        <div style={{ display: 'inline-block' }}>
                            <FormItem label="Período">
                                {getFieldDecorator('periodo', {
                                    rules: [{ required: true, message: 'Ingrese el periodo' }],
                                })(<Select
                                    placeholder="Periodo"
                                    style={{ width: 100 }}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>

                                </Select>)}
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            );
        }
    }
);



class FormEmpresario extends Component {
    state = {
        visible: false,
        empresarioList: [],
        cargando: false
    };
    ///////////
    componentDidMount() {
        axios.get(LISTAR_EMPRESARIO, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const empresarioList = res.data;
                this.setState({ empresarioList, cargando: true });
                message.success('Datos cargados correctamente')

            }).catch(err => {
                message.error('No se han podido cargar los datos. Intente nuevamente')
        this.setState({ cargando: false })

            })
    }
    ///////////
    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.post(LISTAR_EMPRESARIO, values, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                .then((result) => {
                    form.resetFields();
                    this.setState({ visible: false, empresarioList: [...this.state.empresarioList, result.data] });
                    message.success('Empresario creado con éxito')
                }).catch(err => {
                    message.error("Ya existe un empresario con el correo ingresado")
                })

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    handleDelete = (key) => {
        axios.delete(ELIMINAR_EDITAR_EMPRESARIO.replace(":id", key), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then((result) => {
                this.setState({ empresarioList: this.state.empresarioList.filter(item => item.id !== key) });
                message.success('Empresario eliminado con éxito')
            }).catch(err => {
                message.error('No se ha podido eliminar el empresario. Intennte nuevamente')
            })
    }

    actualizar = () => {
        axios.get(LISTAR_EMPRESARIO, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const empresarioList = res.data;
                this.setState({ empresarioList });
                message.success('Tabla actualizada con éxito')
            }).catch(err => {
                message.error('No se ha podido actualizar la tabla. Intennte nuevamente')
            })

    }

    render() {

        const { empresarioList } = this.state;
        if (!this.state.cargando) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}><Spin size="large" /></div>
        } else {
            return (
                <div>
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ paddingBottom: '30px', margin: '10px' }}>
                            <Button type="primary" onClick={this.showModal} icon="user-add" >Agregar empresario</Button>
                            <Button type="primary" onClick={this.actualizar} style={{ margin: '10px' }} icon="reload">Actualizar</Button>
                        </div>

                    </div>

                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                    <TablaEmpresario dataSource={empresarioList} onDelete={this.handleDelete} />
                </div>
            );
        }
    }
}


export default FormEmpresario;

import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    Menu,
    message,
    Select
} from 'antd';
import TablaEstudiante from './TablaEstudiante';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {
        render() {


            function handleChange(value) {
                console.log(`Valor: ${value}`);
            }
            
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Agregar nuevo estudiante"
                    okText="Crear"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Nombre">
                            {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Por favor ingrese el nombre' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Apellido">
                            {getFieldDecorator('apellido', {
                                rules: [{ required: true, message: 'Por favor ingrese el apellido' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Correo">
                            {getFieldDecorator('correo', {
                                rules: [{
                                    type: 'email', message: 'Ingrese un correo válido',
                                }, {
                                    required: true, message: 'Por favor ingrese el correo',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Contraseña">
                            {getFieldDecorator('contraseña', {
                                rules: [{ required: true, message: 'Por favor ingrese la contraseña' }],
                            })(<Input />)}
                        </FormItem>
                        <div style={{ display: 'inline-block' }}>
                            <FormItem label="Año">
                                {getFieldDecorator('anio', {
                                    rules: [{ required: true, message: 'Por favor ingrese el año' }],
                                })(<Input style={{ width: '100px', marginRight: '3%' }} />)}
                            </FormItem>
                        </div>

                        <div style={{ display: 'inline-block' }}>
                            <FormItem >
                                {getFieldDecorator('periodo', {
                                    rules: [{ required: true, message: 'Por favor ingrese el periodo' }],
                                })(<Select onChange={handleChange}
                                placeholder= "Periodo"
                                style={{ width: 100 }}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>

                                </Select>)}
                            </FormItem>
                        </div>
                        <div style={{ display: 'inline-block' }}>
                        <FormItem >
                                {getFieldDecorator('rol', {
                                    rules: [{ required: true, message: 'Por favor ingrese el rol' }],
                                })(<Select onChange={handleChange}
                                    placeholder= "Rol"
                                    style={{ width: 200 }}>
                                    <Option value="estudiante">Estudiante</Option>
                                    <Option value="empresario">Empresario</Option>
    
                                    </Select>)}
                            </FormItem>
                        </div>
                        <FormItem label="Integrantes">
                            {getFieldDecorator('integrantes', {
                                rules: [{ required: true, message: 'Por favor ingrese los integrantes' }],
                            })(<TextArea rows={5} />)}
                        </FormItem>
                        <FormItem label="Empresario">
                            {getFieldDecorator('empresario', {
                                rules: [{ required: true, message: 'Por favor ingrese el empresario asignado' }],
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);



class FormEstudiante extends Component {
    state = {
        visible: false,
    };

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

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    render() {
        return (
            <div>
                <div style={{ paddingBottom: '30px' }}>
                    <Button type="primary" onClick={this.showModal}>Agregar estudiante</Button>
                </div>

                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <TablaEstudiante />
            </div>
        );
    }
}


export default FormEstudiante;

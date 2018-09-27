import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    Radio,
    Dropdown,
    Menu,
    message
} from 'antd';


const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(

    class extends React.Component {
        render() {

            function handleMenuClick(e) {
                message.info('Click on menu item.');
                console.log('click', e);
            }

            const menu = (
                <Menu onClick={handleMenuClick}>
                    <Menu.Item key="1">1</Menu.Item>
                    <Menu.Item key="1">2</Menu.Item>

                </Menu>
            );

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
                        <FormItem label="Año">
                            {getFieldDecorator('anio', {
                                rules: [{ required: true, message: 'Por favor ingrese el año' }],
                            })(<Input  style={{ width: '100px', marginRight: '3%' }} />)}
                        </FormItem>

                        <FormItem >
                            {getFieldDecorator('periodo', {
                                rules: [{ required: true, message: 'Por favor ingrese el periodo' }],
                            })(<Dropdown overlay={menu} trigger={['click']}>
                                <Button style={{  width: '100px'}}>
                                    Periodo 
                                </Button>
                            </Dropdown>)}
                        </FormItem>

                        <FormItem className="collection-create-form_last-form-item">
                            {getFieldDecorator('rol', {
                                initialValue: 'estudiante',
                            })(
                                <Radio.Group>
                                    <Radio value="estudiante">Estudiante</Radio>

                                </Radio.Group>
                            )}
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
                <Button type="primary" onClick={this.showModal}>Agregar estudiante</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}


export default FormEstudiante;

import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Modal,
    Form,
    Input,
    Select
} from 'antd';
import TablaEstudiante from './TablaEstudiante';

const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {

        constructor() {
            super();

        }

        /* handleChange = (e) => {
             this.setState({ [e.target.name]: e.target.value });
         }*/

        handleSubmit = (e) => {
            e.preventDefault();

            this.props.form.validateFields((err, values) => {

                if (!err) {

                }
            });



        }
        render() {

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
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                        <FormItem label="Nombre">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Por favor ingrese el nombre' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Apellido">
                            {getFieldDecorator('lastname', {
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
                            <FormItem label="Periodo">
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

            axios.post('http://127.0.0.1:8080/api/student', values)
                .then((result) => {
                    console.log(result.data);
                })
            console.log('Received : ', values);
            console.log('Received  form: ', values);
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
                    <Button type="primary" onClick={this.showModal} >Agregar estudiante</Button>
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

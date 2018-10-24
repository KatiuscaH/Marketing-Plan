import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import TablaPlanAccion from './TablaPlanAccion';
import axios from 'axios';


const FormItem = Form.Item;
const { TextArea } = Input;

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
                    title="Agregar Plan de Acción"
                    okText="Crear"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Objetivo estratégico">
                            {getFieldDecorator('obj_estrate', {
                                rules: [{ required: true, message: 'Por favor ingrese el objetivo estratégico' }],
                            })(
                                <TextArea autosize />
                            )}
                        </FormItem>
                        <FormItem label="Tácticas (Corto Plazo)">
                            {getFieldDecorator('tacticas', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la táctica',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Responsable">
                            {getFieldDecorator('responsable', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese el responsable',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Fecha">
                            {getFieldDecorator('fecha', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la fecha',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Presupuesto">
                            {getFieldDecorator('presupuesto', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese el presupuesto',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Indicador de logro">
                            {getFieldDecorator('indicador_logro', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese el indicador de logro',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        
                    </Form>
                </Modal>
            );
        }
    }
);



class PlanAccion extends Component {
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
            /*  axios.post('http://127.0.0.1:8080/api/empresario',  values)
              .then((result) => {
                  console.log(result.data);
              })*/
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

                <h1 style={{ textAlign: 'center' }}>Plan de Acción</h1>
                <div style={{ paddingBottom: '30px' }}>
                    <Button type="primary" onClick={this.showModal}>Agregar Plan de Acción</Button>
                </div>

                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <TablaPlanAccion />
            </div>
        );
    }
}


export default PlanAccion;

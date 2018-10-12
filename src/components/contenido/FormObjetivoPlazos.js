import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import TablaObjetivosPlazos from './TablaObjetivosPlazos';
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
                    title="Agregar nuevo objetivo"
                    okText="Crear"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Número del objetivo">
                            {getFieldDecorator('name_objetivo', {
                                rules: [{ required: true, message: 'Por favor ingrese el número' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Descripción del objetivo">
                            {getFieldDecorator('descrip_obj', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la descripción del objetivo',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);



class FormObjetivoPlazos extends Component {
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
            axios.post('http://127.0.0.1:8080/api/empresario',  values)
            .then((result) => {
                console.log(result.data);
            })
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
                    <Button type="primary" onClick={this.showModal}>Agregar Objetivo</Button>
                </div>

                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <TablaObjetivosPlazos />
            </div>
        );
    }
}
 

export default FormObjetivoPlazos;

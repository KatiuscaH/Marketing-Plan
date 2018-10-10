import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
    Select
} from 'antd';


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

                <Form layout="vertical">
                    <FormItem label="Nombre del Plan de Marketing">
                        {getFieldDecorator('name_plan', {
                            rules: [{ required: true, message: 'Por favor ingrese el nombre' }],
                        })(
                            <Input placeholder="Nombre plan de marketing" />
                        )}
                    </FormItem>
                    <FormItem label="Grupo de estudiantes">
                        {getFieldDecorator('grupo_estudiantes', {
                            rules: [{ required: true, message: 'Por favor ingrese los nombres' }],
                        })(<Input placeholder="Nombres separados por coma" />)}
                    </FormItem>
                    <FormItem label="Empresario asignado">
                        {getFieldDecorator('empresario_asignado', {
                            rules: [{
                                required: true, message: 'Por favor ingrese el empresario asignado',
                            }],
                        })(<Input placeholder="Nombres del empresario asignado" />)}
                    </FormItem>
                </Form>

            );
        }
    }
);



class DatosPlanMarketing extends Component {
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
            /* axios.post('http://127.0.0.1:8080/api/empresario',  values)
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
                <h1>Datos iniciales del Plan de Marketing</h1>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />

                <div style={{ paddingBottom: '30px' }}>
                    <Button type="primary" onClick={this.showModal}>Guardar Datos</Button>
                </div>
            </div>
        );
    }
}


export default DatosPlanMarketing;

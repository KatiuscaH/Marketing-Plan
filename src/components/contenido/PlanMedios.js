import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import TablaPlanMedios from './TablaPlanMedios';
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
                    title="Agregar Plan de Medios"
                    okText="Crear"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                        <FormItem label="Tipo de publicidad">
                            {getFieldDecorator('tipo_publicidad', {
                                rules: [{ required: true, message: 'Por favor ingrese el tipo de publicidad' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Característica">
                            {getFieldDecorator('caracteristica', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la característica',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Ubicación o punto de entrega de publicidad">
                            {getFieldDecorator('entrega', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese los datos',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Fecha de realización de la publicidad">
                            {getFieldDecorator('fecha', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la fecha',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Duración de la campaña">
                            {getFieldDecorator('duracion', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la duración de la campaña',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Número por publicidad">
                            {getFieldDecorator('num_publi', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese el número por publicidad',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Costo total">
                            {getFieldDecorator('costo', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese el costo total',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);



class PlanMedios extends Component {
    state = {
        visible: false,
        planMediosList: []
    };


    ////////get
    /*
    componentDidMount() {
         axios.get(ADD_ESTUDIANTES)
        .then(res => {
            const studentList = res.data;
            this.setState({ studentList });
        }).catch(err => {
            console.log(err.res)
        })
}
*/
    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    ////////post

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            /*  axios.post('http://127.0.0.1:8080/api/empresario',  values)
              .then((result) => {
             console.log(result.data);
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
              })*/
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
//////////delete
/*
    handleDelete = (key) => {
        axios.delete(AC_ESTUDIANTES.replace(":id", key))
            .then((result) => {

                this.setState({ planMediosList: this.state.planMediosList.filter(item => item.id !== key) });
            })
    }
*/
    render() {
        const { planMediosList } = this.state
        return (
            <div>

                <h1 style={{ textAlign: 'center' }}>Plan de Medios</h1>
                <div style={{ paddingBottom: '30px' }}>
                    <Button type="primary" onClick={this.showModal}>Agregar Plan de Medios</Button>
                </div>

                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <TablaPlanMedios dataSource={planMediosList} onDelete={this.handleDelete}/>
            </div>
        );
    }
}


export default PlanMedios;

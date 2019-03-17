import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import TablaPlanMedios from './TablaPlanMedios';
import { ADD_PLAN_MEDIOS, ELIMINAR_PLAN_MEDIOS } from '../../config';
import axios from 'axios';


const FormItem = Form.Item;
const { TextArea } = Input;

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
                    title="Agregar Plan de Medios"
                    okText="Crear"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                    <FormItem label="Tipo de publicidad">
                            {getFieldDecorator('tipopublicidad', {
                                rules: [{ required: true, message: 'Por favor ingrese el tipo de publicidad' }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Característica">
                            {getFieldDecorator('caracteristicas', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la característica',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Ubicación o punto de entrega de publicidad">
                            {getFieldDecorator('ubicacion', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese los datos',
                                }],
                            })(<TextArea autosize />)}
                        </FormItem>
                        <FormItem label="Fecha de realización de la publicidad">
                            {getFieldDecorator('realizacion', {
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
                            {getFieldDecorator('numero', {
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


    componentDidMount() {
        axios.get(ADD_PLAN_MEDIOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const planMediosList = res.data;
                this.setState({ planMediosList});
            }).catch(err => {
                 
            })
    }

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
            axios.post(ADD_PLAN_MEDIOS, values, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                .then((result) => {
                     
                     
                    form.resetFields();
                    this.setState({ visible: false, planMediosList: [...this.state.planMediosList, result.data] });
                }).catch(err => {
                    //message.error("error")
                })

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
//////////delete

    handleDelete = (key) => {
         
        axios.delete(ELIMINAR_PLAN_MEDIOS.replace(":id", key), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then((result) => {
                 
                this.setState({ planMediosList: this.state.planMediosList.filter(item => item.id !== key) });
            })
     }


    render() {
        const { planMediosList } = this.state
        return (
            <div>

                <h1 style={{ textAlign: 'center', color: 'black'  }}>Plan de Medios</h1>
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

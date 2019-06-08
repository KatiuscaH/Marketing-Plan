import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    message,
    Spin
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
                    okText="Guardar"
                    cancelText="Cancelar"
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
                                initialValue: '$',
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
        planMediosList: [],
        cargando: false
    };


    componentDidMount() {
        // this.setState({cargando: true});
        axios.get(ADD_PLAN_MEDIOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const planMediosList = res.data;
                this.setState({ planMediosList: planMediosList, cargando: true});
                message.success('Plan de medios cargado correctamente')

            }).catch(err => {
                this.setState({  cargando: false});
                message.error('No se han podido cargar el plan de medios. Intente nuevamente')
                 
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
                    message.success('Plan de medios guardado correctamente')

                }).catch(err => {
                    message.error('No se pudo guardar el plan de medios correctamente. Intente nuevamente')

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
message.success('Plan de medios eliminado correctamente');

            }).catch(er => {
message.error('No se pudo eliminar el plan de medios correctamente. Intente nuevamente');

            })
     }


    render() {
        const { planMediosList } = this.state
        if (!this.state.cargando) {
            return <div> 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
                    <Spin size="large" />
                </div>
            </div>
        } else {

        return (
            <div>

                <h1 style={{ textAlign: 'center', color: 'black'  }}>Plan de Medios</h1>
                <div style={{ paddingBottom: '30px' }}>
                    <Button type="primary" onClick={this.showModal} icon="plus">Agregar Plan de Medios</Button>
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
    }}
}


export default PlanMedios;

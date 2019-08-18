import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Select as AntdSelect,
    Spin,
    message
} from 'antd';
import axios from 'axios';
import TablaDatosPlan from './TablaDatosPlan';
import { DATOS_INICIALES_PLAN, ELIMINAR_DATOS_INICIALES_PLAN, LISTAR_EMPRESARIO, ME } from '../../config';

const FormItem = Form.Item;
const Option = AntdSelect.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {
        state = { dataSource: []};

        componentDidMount() {
            this.setState(() => {
                axios.get(LISTAR_EMPRESARIO, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                    .then(res => {
                        const dataSource = [];
                        res.data.forEach(element => {
                            dataSource.push({
                                value: element.id,
                                label: `${element.nombre} ${element.apellido}`,

                            })
                        });
                        this.setState({ dataSource });
                         

                    }).catch(err => {
                         
                    })
            });
        }

        render() {
            function handleChange(value) {
                 
            }

            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Crear plan de marketing"
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                        <FormItem label="Nombre del Plan de Marketing">
                            {getFieldDecorator('plan', {
                                rules: [{ required: true, message: 'Por favor ingrese el nombre' }],
                            })(
                                <Input placeholder="Nombre plan de marketing" />
                            )}
                        </FormItem>
                        <FormItem label="Grupo de estudiantes">
                            {getFieldDecorator('estudiantes', {
                                rules: [{ required: true, message: 'Por favor ingrese los nombres' }],
                            })(<Input placeholder="Nombres separados por coma" />)}
                        </FormItem>
                        <FormItem label="Empresario asignado">
                            {getFieldDecorator('empresario_id', {
                                rules: [{
                                    required: true, message: 'Por favor seleccione el empresario asignado',
                                }],
                            })(
                                <AntdSelect>
                                    {this.state.dataSource.map(item => (<Option key={item.value} value={item.value}>{item.label}</Option>))}
                                </AntdSelect>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }



);



class DatosPlanMarketing extends Component {
    state = {
        visible: false,
        datosPlanList: [],
        cargando: false,
        campoS: false

    };
    ////componer aqui lo del campo
    componentDidMount() {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        if (campo == null) {
            this.setState({ campoS: true })
        }else{
             
            axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", campo), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                .then(({ data }) => {
                     
                    let { nombre, apellido } = data.empresario
                    let empresario = `${nombre} ${apellido}`;
                    let datos = {
                        plan: data.plan,
                        estudiantes: data.estudiantes,
                        empresario_id: empresario,
                        id: campo,
                    }
                     message.success('Datos del plan de marketing cargados correctamente')
                    this.setState({ datosPlanList: [datos], cargando: true });
                }).catch(err => {
                    this.setState({  cargando: false });
                    message.error('Los Datos del plan de marketing no han podido cargarse. Intente nuevamente')
                     
                })

        }


    }
    /////

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
            axios.post(DATOS_INICIALES_PLAN, values, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                .then((result) => {
                     
                    form.resetFields();
                    this.setState({ visible: false, datosPlanList: [...this.state.datosPlanList, result.data] });
                    let ls = JSON.parse(localStorage.getItem('user'));
                    ls.marketing_id = result.data.id;
                    localStorage.setItem('user', JSON.stringify(ls));
                    message.success('Datos del plan de marketing agregados correctamente')

                }).catch(err => {
                    message.error('Los Datos del plan de marketing no han podido agregarse. Intente nuevamente')
                    
                });

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleDelete = (key) => {
        axios.delete(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", key), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then((result) => {
                this.setState({ datosPlanList: this.state.datosPlanList.filter(item => item.id !== key) });
            })
    }


    render() {

        // if (!this.state.cargando) {
        //     return <div> <h1>Datos iniciales del Plan de Marketing</h1>
        //         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
        //             <Spin size="large" />
        //         </div>
        //     </div>
        // } else {
            if(this.state.campoS!==null){
                return (
                    <div>
                        <h1 style={{color: 'black'}}>Datos iniciales del Plan de Marketing</h1>
                        <div style={{ paddingBottom: '30px' }}>
                            <Button type="primary" icon="save" onClick={this.showModal}>Guardar Datos</Button>
                        </div>
                        <CollectionCreateForm
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
                        <TablaDatosPlan dataSource={this.state.datosPlanList} onDelete={this.handleDelete} />

                    </div>
                );
         }
       }

    // }
}


export default DatosPlanMarketing;

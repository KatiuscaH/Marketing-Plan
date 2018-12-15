import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    Select
} from 'antd';
import TablaPlanAccion from './TablaPlanAccion';
import { ADD_OBJETIVOS } from '../../config';
import axios from 'axios';


const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {
        state = {dataSource: []}

        componentDidMount() {
            this.setState(() => {
                axios.get(ADD_OBJETIVOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                    .then(res => {
                        const dataSource = [];
                        res.data.forEach(element => {
                            dataSource.push({
                                value: element.id,
                                label: `${element.nombre}`,

                            })
                        });
                        this.setState({ dataSource });
                        console.log(dataSource);
                        
                    }).catch(err => {
                        console.log(err.res)
                    })
            });
        }

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
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                        <FormItem label="Objetivo estratégico">
                            {getFieldDecorator('obj', {
                                rules: [{ required: true, message: 'Por favor ingrese el objetivo estratégico' }],
                            })(
                                <Select>
                                    {this.state.dataSource.map(item=>(<Option key={item.value} value={item.value}>{item.label}</Option>))}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="Tácticas (Corto Plazo)">
                            {getFieldDecorator('tacticas', {
                                rules: [{
                                    required: true, message: 'Por favor ingrese la táctica',
                                }],
                            })(<TextArea row={10} />)}
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
                            })(<TextArea row={10} />)}
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
        planList: []
    };

    ////GET
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
            this.setState({ visible: false, planList: [...this.state.planList, result.data] });
              })*/

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
//////delete
/*
    handleDelete = (key) => {
        axios.delete(AC_ESTUDIANTES.replace(":id", key))
            .then((result) => {

                this.setState({ planList: this.state.planList.filter(item => item.id !== key) });
            })
    }
*/
    render() {
        const { planList } = this.state
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
                <TablaPlanAccion dataSource={planList} onDelete={this.handleDelete}/>
            </div>
        );
    }
}


export default PlanAccion;

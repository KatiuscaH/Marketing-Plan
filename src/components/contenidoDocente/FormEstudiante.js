import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Spin,
    message
} from 'antd';
import TablaEstudiante from './TablaEstudiante';
import { AC_ESTUDIANTES, ADD_ESTUDIANTES } from '../../config';

const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {

        constructor() {
            super();
        }

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
        studentList: [],
        cargando: false
    };

    componentDidMount() {

        axios.get(ADD_ESTUDIANTES, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const studentList = res.data;
                this.setState({ studentList , cargando: true});
            }).catch(err => {
                console.log(err.res)
            })
    }

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

            axios.post(ADD_ESTUDIANTES, values, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                .then((result) => {
                    console.log(result.data);
                    console.log('Received : ', values);
                    console.log('Received  form: ', values);
                    form.resetFields();
                    this.setState({ visible: false, studentList: [...this.state.studentList, result.data] });
                }).catch(err => {
                    console.log("Error de corre: ", err)
                    message.error("Ya existe un estudiante con el correo ingresado")
                })
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    handleDelete = (key) => {
        axios.delete(AC_ESTUDIANTES.replace(":id", key), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then((result) => {

                this.setState({ studentList: this.state.studentList.filter(item => item.id !== key) });
            })
    }

    actualizar = () => {
        axios.get(ADD_ESTUDIANTES, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const studentList = res.data;
                this.setState({ studentList });
            }).catch(err => {
                console.log(err.res)
            })
    }
    
    render() {
        
        const { studentList } = this.state
        if(!this.state.cargando){
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}><Spin size="large"/></div>
        }else{
            return (
                <div >
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ paddingBottom: '30px', margin: '10px' }}>
                            <Button type="primary" onClick={this.showModal} >Agregar estudiante</Button>
                            <Button type="primary" onClick={this.actualizar} style={{ margin: '10px' }}>Actualizar</Button>
                        </div>
    
                    </div>
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                    <TablaEstudiante dataSource={studentList} onDelete={this.handleDelete} />
                </div>
            );
        }
          
        
       
    }
}


export default FormEstudiante;

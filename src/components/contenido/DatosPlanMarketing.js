import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Select as AntdSelect
} from 'antd';
import axios from 'axios';
import TablaDatosPlan from './TablaDatosPlan';

const FormItem = Form.Item;
const Option = AntdSelect.Option;

const CollectionCreateForm = Form.create()(

    class extends React.Component {
        state = { dataSource: [] };

        componentDidMount() {
            this.setState(() => {
                console.log('setting state');
                axios.get(LISTAR_EMPRESARIO)
                    .then(res => {
                        const dataSource = [];
                        res.data.forEach(element => {
                            dataSource.push({
                                value: element.id,
                                label: `${element.name} ${element.lastname}`,
                                
                            })
                        });
                        this.setState({ dataSource });
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
                    title="Agregar nuevo estudiante"
                    okText="Crear"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical" onSubmit={this.handleCreate}>
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
                            {getFieldDecorator('empresario_id', {
                                
                                rules: [{
                                    required: true, message: 'Por favor seleccione el empresario asignado',
                                }],
                                
                            })(<AntdSelect>
                                {this.state.dataSource.map(item => (<Option key={item.value} value={item.value}>{item.label}</Option>))}
                            </AntdSelect>)}
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
        datosPlanList: []
    };
/*
AQUI VA EL GET DE LOS DATOS DEL PLAN
    componentDidMount() {
        
        axios.get(`${HOST}/api/student`)
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
/*
AQUI VA EL POST PARA AGREGAR LOS DATOS!
            axios.post('http://127.0.0.1:8080/api/student', values)
            .then((result) => {
                console.log(result.data);
                console.log('Received : ', values);
                console.log('Received  form: ', values);
                form.resetFields();
                this.setState({ visible: false, studentList: [...this.state.studentList, result.data] });
            })*/
            console.log('Received : ', values);
            console.log('Received  form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleDelete = (key) => {
        axios.delete(/*ENDPOINT_ELIMINAR_DATOS.*/replace(":id", key))
        .then((result) => {
            this.setState({ datosPlanList: this.state.datosPlanList.filter(item => item.id !== key)});
        })
    }


    render() {
        const { datosPlanList } = this.state
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
                <TablaDatosPlan dataSource={datosPlanList} onDelete={this.handleDelete}/>
            </div>
        );
    }
}


export default DatosPlanMarketing;

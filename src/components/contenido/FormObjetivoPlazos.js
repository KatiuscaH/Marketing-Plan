import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input
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
                    <Form layout="vertical" onSubmit={this.handleCreate}>
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
                            })(<TextArea rows={4} autosize />)}
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
        objetivoList: []
    };
///////GET PARA LOS OBJETIVOS!
/*
    componentDidMount(){
        axios.get(ADD_ESTUDIANTES)
            .then(res => {
                const objetivoList = res.data;
                this.setState({ objetivoList });
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

    ///////////////POSTS
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
            this.setState({ visible: false, objetivoList: [...this.state.objetivoList, result.data] });
            })*/
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

////////////DELETE
/*
    handleDelete = (key) => {
        axios.delete(AC_ESTUDIANTES.replace(":id", key))
            .then((result) => {

                this.setState({ objetivoList: this.state.objetivoList.filter(item => item.id !== key) });
            })
    }
*/

    render() {
        const { objetivoList } = this.state
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
                <TablaObjetivosPlazos dataSource={objetivoList} onDelete={this.handleDelete} />
            </div>
        );
    }
}
 

export default FormObjetivoPlazos;

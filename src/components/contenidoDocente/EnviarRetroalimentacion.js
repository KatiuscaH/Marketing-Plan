import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import {  ENVIAR_MAIL,ADD_ESTUDIANTES} from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import MostrarProgresoEstrategiasEstudiante from './MostrarProgresoEstrategiasEstudiante';
import {
    Modal,
    Form,
    Input,
    Select,
    Spin,
    message
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
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
            const { visible, onCancel, onCreate, form, email } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Enviar correo"
                    okText="Enviar"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                    okButtonProps={{icon: "arrow-right"}}
                >
                    <Form layout="vertical" onSubmit={this.handleCreate}>
                    <h2>Enviar a: {email}</h2>
                        <FormItem label="Asunto">
                            {getFieldDecorator('subject', {
                                rules: [{ required: true, message: 'Por favor ingrese el asunto' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Contenido">
                            {getFieldDecorator('text', {
                                rules: [ {
                                    required: true, message: 'Por favor ingrese el correo',
                                }],
                            })(<TextArea rows={4} />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);
class EnviarRetroalimentacion extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas: [],
            datas2: {presentacion:null},//Plan
            datas3:[],//estrategias,
            cargando: false
        }
        this.columns = [{
            title: 'Nombres',
            dataIndex: 'nombre',
        }, {
            title: 'Apellidos',
            dataIndex: 'apellido',
        }, {
            title: 'Correo',
            dataIndex: 'email',
            
        },  , {
            title: 'Enviar correo',
            key: 'operacion',
            render: (text, record) => (
                <div>
                    <Button icon="mail" onClick={() => this.showModal(record.email)} type="primary" style={{ marginRight: '10px' }} >
                       Enviar Correo
                    </Button>
                 
                </div>
            ),
        }
        ];
    }
    state = {
        visible: false,
        studentList: [],
        cargando: false,
        email: "",
    };
    showModal = (email) => {
        console.log(email);
        
        this.setState({ visible: true, email });
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
            this.setState({cargando: true})
            let nV = {...values, email: this.state.email}
            axios.post(ENVIAR_MAIL, nV, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
                .then((result) => {
                    form.resetFields();
                   this.setState({ visible: false, cargando: false });
                   message.success('Correo electrónico enviado con éxito.')
                }).catch(err => {

            this.setState({cargando: false})
                     message.error('No se pudo enviar el correo electrónico. Intente nuevamente')
                })
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    componentDidMount() {
        axios.get(ADD_ESTUDIANTES, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const studentList = res.data;
                this.setState({ studentList});
            }).catch(err => {
                 
            })
    }


    render() {
        console.log({
            state: this.state
        });
        
        if(this.state.cargando){
            return(
                <div>
                <Spin/>
                </div>
            )
        } else {
        return (
            <div>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.studentList} bordered></Table>
                <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        email={this.state.email}
                    />
            </div>
        )
    }
}
}

export default EnviarRetroalimentacion;
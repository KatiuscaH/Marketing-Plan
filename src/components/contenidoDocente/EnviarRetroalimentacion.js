import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
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
import Highlighter from 'react-highlight-words';

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
                    <h2 style={{color: '#000'}}>Enviar a: {email}</h2>
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
            cargando: false,
            searchText: '',
        }
        this.columns = [{
            title: 'Nombres',
            dataIndex: 'nombre',
      ...this.getColumnSearchProps('nombre')

        }, {
            title: 'Apellidos',
            dataIndex: 'apellido',
        }, {
            title: 'Correo',
            dataIndex: 'email',
            
            
        },  , {
            title: 'Enviar correo',
            key: 'operacion',
      className: 'fecha',
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

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 , backgroundColor: 'antiquewhite'}}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Buscar ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
    
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Buscar
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Borrar filtros
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

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
        this.setState({ cargando: true});
        axios.get(ADD_ESTUDIANTES, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const studentList = res.data;
                this.setState({ studentList, cargando: false});
                message.success('Datos cargados correctamente')
            }).catch(err => {
                message.error('Los datos no han podido cargarse. Intente nuevamente')                 
            })
    }


    render() {
        console.log({
            state: this.state
        });
        
        if(this.state.cargando){
            return(
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
                <Spin size="large" />
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
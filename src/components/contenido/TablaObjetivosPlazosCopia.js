import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, message } from 'antd';
import { ELIMINAR_OBJETIVOS, ACTUALIZAR_OBJETIVOS } from '../../config';
import axios from 'axios';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} es requerido.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class TablaObjetivosPlanCopia extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dataSource: [],
    objCumplido: 'No'
  }

  ////////PUT
  handleSave = (row) => {
    axios.put(ELIMINAR_OBJETIVOS.replace(":id", row.id), row, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then((result) => {

      })

    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  cumplidoObj = (campo) => {
    axios.put((ACTUALIZAR_OBJETIVOS).replace(':id', campo), { cumplido: 1 }, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        message.success('¡Felicidades, Cumpliste el objetivo!. Actualiza la página para ver los cambios reflejados.');
        this.setState({ objCumplido: 'Si' });

      }).catch(err => {
        message.error('No se ha podido marcar como completo. Intenta nuevamente');
      })
  }

  noCumplido = (campo) => {
    axios.put((ACTUALIZAR_OBJETIVOS).replace(':id', campo), { cumplido: 0 }, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        message.success('¡Aún no has cumplido con el objetivo!. Actualiza la página para ver los cambios reflejados.');
        this.setState({ objCumplido: 'Si' });

      }).catch(err => {
        message.error('No se ha podido marcar como completo. Intenta nuevamente');
      })
  }


  render() {
    const { dataSource } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const configColumns = [
      {
        title: 'Descripción del objetivo',
        dataIndex: 'nombre',
        width: 200
      },
      {
        title: 'Cumplido',
        render: (text, record) => {
          return (
            <div>
            Cumplido: 
            {record.cumplido ? ' Si' : ' No'}
          </div>
          )
        }
      },
      {
        title: 'Cumplimiento',
        dataIndex: 'operacion',

        width: 50,

        render: (text, record) => {
          return (
            this.props.dataSource.length >= 1
              ? (
                <Popconfirm title="¿Has cumplido la totalidad de este objetivo?" okText="Si" cancelText="No" onConfirm={() => this.cumplidoObj(record.id)} onCancel={() => this.noCumplido(record.id)}>
                  <a href="javascript:;">Objetivo cumplido</a>
                </Popconfirm>
              ) : null
          );
        },
      }];


    const columns = configColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    //onClick={this.handleApp} le metodo para agregar
    return (
      <div>
        <Table rowKey="id"
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}

export default TablaObjetivosPlanCopia;
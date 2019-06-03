import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Spin, message, Icon } from 'antd';
import axios from 'axios';
import { AC_ESTUDIANTES, ADD_ESTUDIANTES } from '../../config';

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

class EditableTable extends Component {
  constructor(props) {
    super(props);
  }

  state = { dataSource: [] };
  
  handleSave = (row) => {
    axios.put(AC_ESTUDIANTES.replace(":id", row.id), row,{ headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then((result) => {
         this.setState({dataSource: result.data})
         message.success('Estudiante actualizado con éxito. Presione el botón actualizar para ver los cambios reflejados.')
      }).catch(err => {
        message.error('No se ha podido actualizar el estudiante. Intente nuevamente.')
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

  render() {
    const { dataSource, onDelete } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const configColumns = [{
      title: 'Nombres',
      dataIndex: 'nombre',
      editable: true,

    }, {
      title: 'Apellidos',
      dataIndex: 'apellido',
      editable: true,
    }, {
      title: 'Correo',
      dataIndex: 'email',
      
    }, {
      title: 'Año',
      dataIndex: 'year',
      editable: true,
    }, {
      title: 'Período',
      dataIndex: 'periodo',
      editable: true,
    }, {
      title: 'Eliminar',
      dataIndex: 'operacion',

      render: (text, record) => {
        return (
          this.props.dataSource.length >= 1
            ? (
              <Popconfirm title="¿Desea eliminar este estudiante?" okText="Si" cancelText="No" icon={<Icon type="delete" />} onConfirm={() => onDelete(record.id)}>
                <a href="javascript:;">Eliminar</a>
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
if(!this.state.dataSource){
  return <Spin/>
}else{
    return (
      <div>
        <Table rowKey="id"
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
  }
}

export default EditableTable;
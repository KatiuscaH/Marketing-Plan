import React, { Component } from 'react';
import { Table, Input, Spin , Popconfirm, Form } from 'antd';
import axios from 'axios';
import { HOST, AC_ESTUDIANTES } from '../../config';
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
    console.log("asd")
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      console.log(values)
      console.log(record)
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
    this.columns = [{
      title: 'Nombre',
      dataIndex: 'name',
      editable: true,

    }, {
      title: 'Apellido',
      dataIndex: 'lastname',
      editable: true,
    }, {
      title: 'Correo',
      dataIndex: 'email',
      editable: true,
    }, {
      title: 'Año',
      dataIndex: 'year',
      editable: true,
    }, {
      title: 'Periodo',
      dataIndex: 'periodo',
      editable: true,
    }, {
      title: 'Operaciones',
      dataIndex: 'operacion',

      render: (text, record) => {
        return (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="¿Eliminar?" onConfirm={() => this.handleDelete(record.id)}>
                <a href="javascript:;">Eliminar</a>
              </Popconfirm>
            ) : null
        );
      },
    }];


  }


  state = { dataSource: [] };

  componentDidMount() {
    axios.get(`${HOST}/api/student`)
      .then(res => {
        const dataSource = res.data;
        this.setState({ dataSource });
      }).catch(err => {
        console.log(err.res)
      })
  }


  handleDelete = (key) => {
    axios.delete(AC_ESTUDIANTES.replace(":id", key))
      .then((result) => {
        console.log(result.data);
      })
    const dataSource = [...this.state.dataSource];

    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave = (row) => {
    console.log("Updated:", row);
    axios.put(AC_ESTUDIANTES.replace(":id", row.id), row)
      .then((result) => {
        console.log(result.data);
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
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

   
    const columns = this.columns.map((col) => {
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

export default EditableTable;
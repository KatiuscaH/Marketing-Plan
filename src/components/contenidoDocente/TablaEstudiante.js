import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Spin, message, Icon, Button } from 'antd';
import axios from 'axios';
import { AC_ESTUDIANTES, ADD_ESTUDIANTES } from '../../config';
import '../contenido/TablaDatosPlan.css'
import Highlighter from 'react-highlight-words';


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

  state = { dataSource: [] ,
    searchText: '',};

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
      ...this.getColumnSearchProps('nombre'),
      width: 200

    }, {
      title: 'Apellidos',
      dataIndex: 'apellido',
      editable: true,
      width: 200


    }, {
      title: 'Correo',
      dataIndex: 'email',
      width: 200

      
    }, {
      title: 'Año',
      dataIndex: 'year',
      editable: true,
      className: 'fecha',
      width: 200,
    sorter: (a, b) => a.year - b.year,
    sortDirections: ['descend'],
    }, {
      title: 'Período',
      dataIndex: 'periodo',
      editable: true,
      className: 'fecha',
      width: 200,
      sorter: (a, b) => a.periodo - b.periodo,
      sortDirections: ['descend'],

    }, {
      title: 'Eliminar',
      dataIndex: 'operacion',
      className: 'fecha',
      width: 200,

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
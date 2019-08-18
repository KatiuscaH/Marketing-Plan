import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Icon } from 'antd';


class TablaPlanAccionEmpresario extends Component {
  constructor(props) {
    super(props);
  }

  state = { dataSource: [] }
 
  render() {
    const { dataSource, onDelete } = this.props;

    const configColumns = [ {
      title: 'Tácticas (Corto Plazo)',
      dataIndex: 'tactica',
      width: 100

    }, {
      title: 'Responsable',
      dataIndex: 'responsable',
      width: 100

    }, {
      title: 'Fecha',
      dataIndex: 'fecha',
      width: 100
    }, {
      title: 'Presupuesto',
      dataIndex: 'presupuesto',
      width: 100
    }, {
      title: 'Indicador de logro',
      dataIndex: 'indicador_logro',
      width: 100
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

    return (
      <div>
        <Table 
          rowKey="id"
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}

export default TablaPlanAccionEmpresario;
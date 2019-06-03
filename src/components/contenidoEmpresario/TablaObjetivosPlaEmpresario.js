import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Icon } from 'antd';


class TablaObjetivosPlanEmpresario extends Component {
  constructor(props) {
    super(props);
  }

  state = { dataSource: [] }
 
  render() {
    const { dataSource, onDelete } = this.props;

    const configColumns = [{
        title: 'Descripción del objetivo',
        dataIndex: 'nombre',
        editable: true,
        width: 200,
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

export default TablaObjetivosPlanEmpresario;
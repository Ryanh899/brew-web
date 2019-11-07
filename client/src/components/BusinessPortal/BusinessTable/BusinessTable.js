import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";

class MaterialTableDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Descripton", field: "description" },
        { title: "Quantity", field: "quantity", type: "numeric" }
      ],
      data: [],
      businessId: "", 
    };
  };
  

  componentDidMount() {
    let url = ''; 
    if (process.env.NODE_ENV === 'production') {
      url = 'http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/promotion/all/business/' + this.props.businessId;
      
    } else {
      url = "http://localhost:5000/api/promotion/all/business/" + this.props.businessId;
    }
    axios
      .get(url)
      .then(response => {
        this.setState({
          data: response.data,
          businessId: this.props.businessId
        });
      })
      .catch(err => console.log(err));
  };

  componentDidUpdate() {
    let url = ''; 
    if (process.env.NODE_ENV === 'production') {
      url = 'http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/promotion/all/business/' + this.props.businessId;
    } else {
      url = "http://localhost:5000/api/promotion/all/business/" + this.props.businessId;
    }
    if (this.props.businessId !== this.state.businessId) {
      axios
        .get(url)
        .then(response => {
          this.setState({
            data: response.data,
            businessId: this.props.businessId
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      // REFACTOR wrapped return component
      <>
        <MaterialTable
          style={{ marginTop: "100px" }}
          title="Promotions"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.push(newData);
                  this.setState({ ...this.state, data });

                  //adds new item to the 
                  let url = '';
                  {process.env.NODE_ENV === 'production' ? url = "http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/promotion/add" : url = "http://localhost:5000/api/promotion/add" }
                  axios
                    .post(url, {
                      business_id: this.props.businessId,
                      promotion_name: newData.name,
                      qtypeople: newData.quantity,
                      description: newData.description
                    })
                    .then(function (res) {
                      console.log(res);
                    })
                    .catch(err => {
                      if (err) throw err;
                    });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ ...this.state, data });
                  let url = '';
                  {process.env.NODE_ENV === 'production' ? url = "http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/promotion/edit" : url = "http://localhost:5000/api/promotion/edit" }
                  axios
                    .put(url, newData)
                    .then(function (res) {
                      console.log(res);
                    })
                    .catch(function (err) {
                      if (err) throw err;
                    });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({ ...this.state, data });

                  //deletes item from DB
                  let url = '';
                  {process.env.NODE_ENV === 'production' ? url = "http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/promotion/delete/" + oldData.promotion_id : url = "http://localhost:5000/api/promotion/delete/" + oldData.promotion_id }
                  axios
                    .post(url)
                    .then(res => {
                      console.log("delete", res);
                    })
                    .catch(err => {
                      if (err) throw err;
                    });
                }, 600);
              })
          }}
        />
      </>
    );
  };
};

export default MaterialTableDemo;

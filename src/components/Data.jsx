import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

export default class Terms extends Component {
  state = {
    zipcode: "",
    name: "",
    policedistrict: "",
    neighborhood: "",

    data: [],
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    axios
      .get("http://localhost:9090/getAllItems")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSearch = (e) => {
    e.preventDefault();

    if (
      this.state.zipcode ||
      this.state.name ||
      this.state.policedistrict ||
      this.state.neighborhood
    ) {
      const data = {};

      if (this.state.zipcode) {
        data.zipcode = this.state.zipcode;
      }
      if (this.state.name) {
        data.name = this.state.name;
      }
      if (this.state.policedistrict) {
        data.policedistrict = this.state.policedistrict;
      }
      if (this.state.neighborhood) {
        data.neighborhood = this.state.neighborhood;
      }

      axios
        .post("http://localhost:9090/findPlace", data)
        .then((res) => {
          this.setState({ data: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.fetchData();
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row m-0">
          <div className="col p-0">
            <form className="mb-5">
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label htmlFor="zipcode">ZIP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    name="zipcode"
                    value={this.state.zipcode}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="policedistrict">Police District</label>
                  <input
                    type="text"
                    className="form-control"
                    id="policedistrict"
                    name="policedistrict"
                    value={this.state.policedistrict}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="neighborhood">Neighborhood</label>
                  <input
                    type="text"
                    className="form-control"
                    id="neighborhood"
                    name="neighborhood"
                    value={this.state.neighborhood}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary d-block m-auto"
                onClick={this.handleSearch}
              >
                Search
              </button>
            </form>
            {this.state.data.length > 0 && (
              <table className="table">
                <tbody>
                  <tr>
                    <td>Zip Code</td>
                    <td>Name</td>
                    <td>Police District</td>
                    <td>Neighborhood</td>
                  </tr>
                  {this.state.data.map((el, i) => (
                    <tr key={i}>
                      <td>{el.zipcode}</td>
                      <td>{el.name}</td>
                      <td>{el.policedistrict}</td>
                      <td>{el.neighborhood}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

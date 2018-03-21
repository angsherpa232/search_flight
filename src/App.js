import React, {Component} from 'react'
import {Table, Pagination} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      from: "",
      to: "",
      dateFrom: "",
      dateTo: "",
      currentPage: 1,
      dataPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
     currentPage: Number(event.target.innerText)
   });
  }

  fetchData (fromDate,toDate) {
    fetch('https://api.skypicker.com/flights?flyFrom='+this.state.from+'&to='+this.state.to+'&dateFrom='+fromDate+'&dateTo='+toDate+'&partner=picky')
    .then(res => res.json())
    .then((resJson) =>
    this.setState({
      isLoaded: true,
      data: resJson.data
    }))
    .catch(error => console.error('Error', error))
  }


  fromHandle () {
    this.setState({
      from: this.refs.from.value
    })
  }

  toHandle () {
    this.setState({
      to: this.refs.to.value
    })
  }

  dateFrom () {
    var f = this.dateTransform(this.refs.dateFrom.value)
    this.setState({
      dateFrom: f
    })
  }

  dateTo () {
    var t = this.dateTransform(this.refs.dateTo.value)
    this.setState({
      dateTo: t
    })
  }

  dateTransform(d) {
    var s = (new Date(d)).toString().split(' ');
    var t = (new Date([s[2],s[1],s[3]].join('/')))
    return t.getDate() + "/" + (t.getMonth()+1) + "/" +t.getFullYear();
}


  searchFlight () {
    this.dateFrom(this.refs.dateFrom.value)
    this.dateTo(this.refs.dateTo.value)
    this.fetchData(this.state.dateFrom,this.state.dateTo);
  }

  render() {
    const { data, currentPage, dataPerPage } = this.state;

    // Logic for displaying data
    const indexOfLastTodo = currentPage * dataPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    const currentdata = data.slice(indexOfFirstTodo, indexOfLastTodo);

    const date = currentdata.map((item, index) => {
      return <Table>
      <tbody>
    {new Date(item.aTimeUTC*1000).toString()}
    </tbody>
    </Table>
    });

    const cityTo = currentdata.map((item, index) => {
      return <Table>
      <tbody>
      {item.cityTo}
      </tbody>
      </Table>
    });

    const price = currentdata.map((item, index) => {
      return <Table>
      <tbody>
      {item.price}
      </tbody>
      </Table>
    });

    const cityFrom = currentdata.map((item, index) => {
      return <Table>
      <tbody>
      {item.cityFrom}
      </tbody>
      </Table>
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
      pageNumbers.push(<Pagination.Item>{i}</Pagination.Item>);
    }

    const renderPageNumbers =(
        <div>
        <Pagination bsSize="large" onClick={this.handleClick}>{pageNumbers}</Pagination>
        </div>
    );

    return (
      <div className="jumbotron">
      <h1> Simple Flight searching App </h1>
        <input type="text" placeholder="From" ref="from" autocomplete="on" onChange={this.fromHandle.bind(this)}/>
        <input type="text" placeholder="To" ref="to" onChange={this.toHandle.bind(this)}/>
        <input type="date" name="dateFrom" ref="dateFrom" onChange={this.dateFrom.bind(this)}/>
        <input type="date" name="dateTo" ref="dateTo" onChange={this.dateTo.bind(this)}/>
        <input type="Submit" value="Submit" onClick={this.searchFlight.bind(this)}/>
      <Table>
      <thead>
      <tr>
      <th>Flight from</th>
      <th>Flight to</th>
      <th>Date and Time</th>
      <th>Price (Eur)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{cityFrom}</td>
        <td>{cityTo}</td>
        <td>{date}</td>
        <td>{price}</td>
        </tr>
        </tbody>
      </Table>
      {renderPageNumbers}
      </div>

    );
  }
}


export default App;

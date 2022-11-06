import React, { useState, useEffect } from 'react'
import { Container, FormControl, Button, Row, Col } from 'react-bootstrap'

export const Searchbar = (props) => {

  const { onSearch } = props;
  // console.log(props)
  const [search, setSearch] = useState('')

  const onChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClick = async (e) => {
    onSearch(search.toLowerCase());
  };

  const handleKeyDown = async (e) => {
    if(e.key === 'Enter')
    {
      onSearch(search.toLowerCase());
    }
    
  };

  return (
    <>
      <div className='mb-2'>
        <Row>
          <Col xs={5}>
            <FormControl
              type="search"
              placeholder="Ingrese un término para realizar la búsqueda"
              className="d-flex me-2  searchbar m-auto rounded-pill"
              aria-label="Buscar"
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </Col>
          <Col xs={1}>
            <Button variant="primary" className="d-flex  searchbar-btn btn-success rounded-pill m-auto" onClick={onClick} >Buscar</Button>
          </Col>
        </Row>
      </div>
    </>
  )
}

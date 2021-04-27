import React, { useEffect, useState } from 'react'
import { Row,Col,Form, Button } from 'react-bootstrap'

export default function PriceForm (props){
  const { modalTitle, itemProduct, client, priceEdit } = props
      const [inputProduct, setInputProduct] = useState({
        type_client:'',
        vat:priceEdit?priceEdit.vat: '',
        price_even:priceEdit?priceEdit.price_even: '',
        price_odd:priceEdit?priceEdit.price_odd: '',
        discount_odd:priceEdit?priceEdit.discount_odd: '',
        discount_even:priceEdit?priceEdit.discount_even: '',
    })

    const handleChange = (e) =>{
        const target = e.target ;
        const name = target.name;
        let value = ''
        if(target.type === 'checkbox'){
        value = target.checked
        }
        else if(target.type === 'file'){

        // const imageUpload = target.files[0].name
        let reader = new FileReader();
        const imageUpload = reader.readAsDataURL(e.target.files[0])
      
        value = imageUpload
        }
        else value = target.value
        setInputProduct({
        ...inputProduct,
        [name]: value
        })

    }

    const handleSubmitData = (e) =>{
        e.preventDefault()
        itemProduct(inputProduct)
    }
    //hooks
    
    useEffect(()=>{
        if(inputProduct){
            // console.log('currState',inputProduct)
        }
    },[inputProduct,])
    return(
        <>
            <Form onSubmit={handleSubmitData} >
          <Row>
            {priceEdit &&priceEdit.type_client_id ? null :                 <Col>
                  <Form.Group>
                <Form.Label>Loại khách hàng
                    </Form.Label>
                    <Form.Control onChange={handleChange} name="type_client" as="select">
                    <option>Vui lòng chọn loại khách hàng</option>
                      {client ? client.map((items) => {
                        return (<option key={items.id} value={items.id}>{ items.name }</option>)
                      }) : null}
                  </Form.Control>
                  </Form.Group>
                </Col>}

      
                <Col>
                  <Form.Group>
                    <Form.Label>VAT</Form.Label>
                    <Form.Control
                      placeholder="VAT"
                      name="vat"
                      onChange={handleChange}
                      type="text"
                      value={inputProduct.vat}
                    />
                  </Form.Group>
                </Col>
              </Row>
      
              <Row>

                <Col>
                  <Form.Group>
                    <Form.Label>Giá chẵn</Form.Label>
                    <Form.Control
                      placeholder="Giá chẵn"
                      name="price_even"
                      onChange={handleChange}
                      type="text"
                      value={inputProduct.price_even}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Giá lẻ</Form.Label>
                    <Form.Control
                      placeholder="Giá lẻ"
                      name="price_odd"
                      onChange={handleChange}
                      value={inputProduct.price_odd}
                    />
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Chiết khấu chẵn</Form.Label>
                        <Form.Control
                        placeholder="Chiết khấu chẵn"
                        name="discount_even"
                          onChange={handleChange}
                          value={inputProduct.discount_even}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>Chiết khấu lẻ</Form.Label>
                        <Form.Control
                        placeholder="Chiết khấu lẻ"
                        name="discount_odd"
                          onChange={handleChange}
                          value={inputProduct.discount_odd}
                        />
                    </Form.Group>
                </Col>
              </Row>

            

      
              <div className="d-flex justify-content-center mt-2">
                <Button type="submit" className='ml-5' >
                  {modalTitle ==='add new' ? 'Lưu' : 'Cập nhật' }
                </Button>
              </div>
            </Form>
        </>
    )
}
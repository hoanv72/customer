import React, { useEffect, useState } from 'react'
import { Row,Col,Form, Button } from 'react-bootstrap'

export default function ProductForm (props){
    const {modalTitle, itemProduct,brand,industry,provider,unit} = props
    const [inputProduct, setInputProduct] = useState({
      brand_id:'',
        code:'',
        name:'',
        industry_id:'',
        provider_id:'',
        price_odd_unit_id: '',
        price_even_unit_id: '',
        team_coefficient: '',
        inventory_warning: '',
        price_odd_import: '',
        price_even_import: '',
        price_odd_sale: '',
        price_even_sale:'',
        vat:''
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
  const handleBlur = (e) => {
    const { name,value } = e.target;
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
            console.log('currState',inputProduct)
        }
    }, [inputProduct,])
    return(
        <>
            <Form onSubmit={handleSubmitData} >
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nhãn Hiệu</Form.Label>
                <Form.Control onBlur={handleBlur} onChange={handleChange} name="brand_id" as="select">
                    <option>Vui lòng chọn nhãn hiệu</option>
                      {brand ? brand.map((items) => {
                        return (<option key={items.id} value={items.id}>{ items.name }</option>)
                      }) : null}
                  </Form.Control>
                  </Form.Group>
                </Col>
      
                <Col>
                  <Form.Group>
                    <Form.Label>Mã Sản Phẩm</Form.Label>
                    <Form.Control
                      placeholder="Mã Sản Phẩm"
                      name="code"
                      onChange={handleChange}
                      type="text"
                      value={inputProduct.code}
                    />
                  </Form.Group>
                </Col>
              </Row>
      
              <Row>

                <Col>
                  <Form.Group>
                    <Form.Label>Tên Sản Phẩm</Form.Label>
                    <Form.Control
                      placeholder="Tên Sản Phẩm"
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={inputProduct.name}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Ngành Hàng</Form.Label>
                <Form.Control onBlur={handleBlur} onChange={handleChange} name="industry_id" as="select">
                      <option>Vui lòng chọn ngành hàng</option>
                      {industry ? industry.map((items) => {
                        return (<option key={items.id} value={items.id}>{ items.name }</option>)
                      }) : null}
                  </Form.Control>
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Nhà Cung Cấp</Form.Label>
                <Form.Control onBlur={handleBlur} onChange={handleChange} name="provider_id" as="select">
                      <option>Vui lòng chọn nhà cung cấp</option>
                      {provider ? provider.map((items) => {
                        return (<option key={items.id} value={items.id}>{ items.name }</option>)
                      }) : null}
                  </Form.Control>
                    </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>ĐVT Chẵn</Form.Label>
                      <Form.Control onBlur={handleBlur} onChange={handleChange} name="price_odd_unit_id" as="select">
                      {unit ? unit.map((items) => {
                        return (<option key={items.id} value={items.id}>{ items.name }</option>)
                      }) : null}
                  </Form.Control>
                    </Form.Group>
            </Col>
            <Col>
                    <Form.Group>
                    <Form.Label>ĐVT Lẻ</Form.Label>
                        <Form.Control onBlur={handleBlur} onChange={handleChange} name="price_even_unit_id" as="select">
                      {unit ? unit.map((items) => {
                        return (<option key={items.id} value={items.id}>{ items.name }</option>)
                      }) : null}
                  </Form.Control>
                    </Form.Group>
                </Col>
          </Row>
          <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Giá nhập</Form.Label>
                        <Form.Control
                          placeholder="Giá nhập"
                  name="price_odd_import"
                  type="number"
                          onChange={handleChange}
                          value={inputProduct.price_odd_import}
                        />
                    </Form.Group>
            </Col>
            <Col>
                    <Form.Group>
                        <Form.Label>Giá nhập lẻ</Form.Label>
                        <Form.Control
                          placeholder="Giá"
                  name="price_even_import"
                  type="number"

                          onChange={handleChange}
                          value={inputProduct.price_even_import}
                        />
                    </Form.Group>
            </Col>
          </Row>
          <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Hệ số quy đổi</Form.Label>
                        <Form.Control
                        placeholder="Hệ số quy đổi"
                        type="number"

                        name="team_coefficient"
                          onChange={handleChange}
                          value={inputProduct.team_coefficient}
                        />
                    </Form.Group>
            </Col>  
            <Col>
                    <Form.Group>
                        <Form.Label>Cảnh báo tồn kho</Form.Label>
                        <Form.Control
                        placeholder="Cảnh báo tồn kho"
                  name="inventory_warning"
                  type="number"

                          onChange={handleChange}
                          value={inputProduct.inventory_warning}
                        />
                    </Form.Group>
                </Col>  
          </Row>
          <Row>
          <Col>
                    <Form.Group>
                        <Form.Label>Giá</Form.Label>
                        <Form.Control
                          placeholder="Giá"
                          name="price_odd_sale"
                          type="number"

                          onChange={handleChange}
                          value={inputProduct.price_odd_sale}
                        />
                    </Form.Group>
            </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Giá lẻ</Form.Label>
                        <Form.Control
                          placeholder="Giá lẻ"
                  name="price_even_sale"
                  type="number"

                          onChange={handleChange}
                          value={inputProduct.price_even_sale}
                        />
                    </Form.Group>
            </Col>
          </Row>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>VAT</Form.Label>
                        <Form.Control
                  placeholder="VAT"
                  type="number"

                        name="vat"
                          onChange={handleChange}
                          value={inputProduct.vat}
                        />
                    </Form.Group>
                </Col>  
              </Row>
              <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                        placeholder="Mô tả"
                        type="textarea"
                        name="note"
                          onChange={handleChange}
                          value={inputProduct.note}
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

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { CircularProgress, CircularProgressLabel, useDisclosure } from "@chakra-ui/react"
import '.././index.css'



function CreditScore(props) {
  const [colorZone, setColorZone] = useState("green.400")

  useEffect(() => {
    if (props.creditScore <= 629) {
      setColorZone("red.400")
    } else if (props.creditScore <= 689) {
      setColorZone("yellow.400")
    } else if (props.creditScore <= 719) {
      setColorZone("teal.400")
    } else {
      setColorZone("green.400")
    }
  }, [props.creditScore])


  return (
    <Container className="credit-score">
      <Row>
        <Col>
          <h1> Your Credit Score </h1>
          <CircularProgress size="300px" value={(props.creditScore / 850)*100} color={colorZone}>
            <CircularProgressLabel>{props.creditScore}</CircularProgressLabel>
          </CircularProgress>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditScore;

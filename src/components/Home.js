import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Logout from "./Auth/Logout";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Alert } from "react-bootstrap";
import CreditScore from "./CreditScore";
import { Button } from "@chakra-ui/react";
import ".././index.css";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import happyCat from ".././assets/happy-cat.png";
import sadCat from ".././assets/sad-cat.png";
import { over, update } from "lodash";

const Home = (props) => {
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [timerColor, setTimerColor] = useState("white");
  const [owed, setOwed] = useState(props.moneyOwed);
  const [leftToBorrow, borrow] = useState(props.leftToBorrow);
  const [owned, updateMoney] = useState(props.moneyYouHave);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [kindAct, setRak] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [countOverdue, setOverdue] = useState(0);
  const [creditScore, setCreditScore] = useState(850);
  const [petStatus, setPetStatus] = useState("Hungry");
  const [interrupt, setInterrupt] = useState(false);
  const [payments, completePayment] = useState([]);
  const [isOverdue, makeOverdue] = useState("");

  const rak = [
    "Donate $5 to charity",
    "Compliment a friend",
    "Help your parents with the household tasks",
    "Give a high five to a friend",
    "Pick up litter",
    "Give someone a gift",
    "Smile at a stranger",
  ];

  function sendText(rak) {
    let textMessage =
      "Hello from Kredible: Credit Scores For Kids! Your child has been tasked to " +
      rak.toLowerCase() +
      ". Help them do so!";
    fetch(
      `http://localhost:4000/send-parent-text?recipient=${""}&textmessage=${textMessage}`
    ).catch((err) => console.error(err));
  }
  function resetTimer() {
    setMinutes(null);
    setSeconds(0);
  }

  function submitPayment() {
    if (owned < paymentAmount) {
      setPaymentAmount(0);
      setOwed(owed - owned);
      updateMoney(0);
    }
    setOwed(owed - paymentAmount);
  }

  function buyItem(price) {
    if (owned >= price) {
      updateMoney(owned - price);
      completePayment([...payments, 0]);
    } else {
      let remaining = owned - price;
      if ((minutes == null || minutes == 0) && (seconds == null || seconds == 0)) {
        setMinutes(1);
        setSeconds(0);
      }
      if (leftToBorrow >= -1 * remaining) {
        borrow(leftToBorrow + remaining);
        setOwed(-1 * remaining + owed);
      } else {
        console.log("in statement");
      }
    }
    setPetStatus("Full");
  }

  function Pet() {
    if (petStatus === "Hungry") {
      return <img src={sadCat}></img>;
    } else {
      return <img src={happyCat}></img>;
    }
  }

  function earnMoney() {
    updateMoney(owned + 5);
  }
  const genRak = () => {
    var randRAK = Math.floor(Math.random() * rak.length);
    sendText(rak[randRAK]);
    setRak(rak[randRAK]);
  };
  useEffect(() => {
    let interval = setInterval(() => {
      setPetStatus("Hungry");
      console.log("SET IT");
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    if (owned >= paymentAmount) {
      console.log("owed is", owed);
      updateMoney(owned - paymentAmount);
      setPaymentAmount(0);
      if (owed == 0) {
        resetTimer();
        console.log("owed is 0");
        console.log("overdue is", countOverdue);
        completePayment([...payments, countOverdue]);
        console.log(payments);
        makeOverdue("");
        setOverdue(0);
      }
    }

    onClose();
  }, [owed]);
  useEffect(() => {
    console.log(payments);
    let sum = 0;
    for (let i = 0; i < payments.length; i++) {
      sum += payments[i];
    }
    let average = sum / payments.length;
    console.log("average", average);
    var paymentHist = 400 - average * 10;
    var oweWeight = 250 - owed;
    var playWeight = 150;
    setCreditScore(Math.floor(paymentHist + oweWeight + playWeight));
  }, [payments]);

  useEffect(() => {
    let interval = setInterval(() => {
      setPetStatus("Hungry");
      console.log("SET IT");
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    let interval = setInterval(() => {
      console.log("interrupt", interrupt, "owed", owed);
      if (owed == 0) {
        clearInterval(interval);
        borrow(props.leftToBorrow);
        setMinutes(null);
        setSeconds(null);
        return;
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (owed > 0) {
            makeOverdue("OVERDUE");
            setOverdue(countOverdue + 1);
            if (countOverdue > 20 && countOverdue % 3 == 0) {
              setCreditScore(creditScore - 1);
            }
          } else {
            clearInterval(interval);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      <Container fluid className="title">
        <Row>
          <Col md={{ span: 7, offset: 1 }}>
            <h1> Kredible: Credit scores for kids! </h1>
          </Col>
          <Col md={{ span: 2, offset: 2 }}>
            <Logout />
          </Col>
        </Row>
      </Container>
      <Container className="controls" fluid id="food">
        <Row className="spacing">
          <Col>
            <Row className="spacing">
              <Col>
                <h1 className="title2">Buy Food</h1>
                <p>money you can borrow: ${leftToBorrow}</p>
              </Col>
            </Row>
            <Row className="spacing">
              <Button colorScheme="orange" onClick={() => buyItem(5)}>
                <p>Buy an apple (-$5)</p>
              </Button>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(10)}>
                <p>Buy a Fish (-$10)</p>
              </Button>
            </Row>
            <Row className="spacing">
              <Button colorScheme="yellow" onClick={() => buyItem(15)}>
                <p>Buy a mango (-$15)</p>
              </Button>
            </Row>
            <Row className="spacing">
              <h1 className="title2">Earn Money</h1>
              <p>money you have: ${owned}</p>
              <CustomModal
                showModalButtonText="Do a random act of kindness (+$5)"
                modalHeader="Do this act of kindness!"
                modalBody={kindAct}
                genRak={() => genRak()}
                earnMoney={() => earnMoney()}
              />
            </Row>
          </Col>
          <Col>
            <Row className="credit-score">
              <CreditScore creditScore={creditScore}></CreditScore>
              <Col>
                <span className="buttonSpacing">
                  {" "}
                  Money You Need To Pay Back: ${owed}
                </span>
                <Button onClick={onOpen} colorScheme="green">
                  Pay Card
                </Button>

                <p>
                  Next payment deadline: <p style={{ color: "red" }}>{isOverdue}</p>
                  <Col>
                    <p>
                      Minutes: {minutes} Seconds: {seconds}
                    </p>
                  </Col>
                </p>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent className="credit-score">
                    <ModalHeader>How much do you want to pay?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Slider
                        onChange={(value) => {
                          setPaymentAmount(value);
                        }}
                        defaultValue={0}
                        min={0}
                        max={Math.min(owed, owned)}
                        step={1}
                      >
                        <SliderTrack bg="blue.100">
                          <Box position="relative" right={10} />
                          <SliderFilledTrack bg="blue" />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                      </Slider>
                      {paymentAmount}
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={() => submitPayment()}>Submit</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="spacing">
              <h1 className="title2">Your Pet</h1>
              <p>your pet is: {petStatus}</p>
              <Pet />
            </Row>
          </Col>
        </Row>
        <a href="https://www.freepik.com/vectors/character">
          Character vector created by jcomp - www.freepik.com
        </a>
      </Container>
    </div>
  );
};

export default Home;

const CustomModal = ({
  showModalButtonText,
  modalHeader,
  modalBody,
  genRak,
  earnMoney,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openRAK = () => {
    genRak();
    onOpen();
  };
  const completeRAK = () => {
    earnMoney();
    onClose();
  };
  return (
    <div>
      <Row className="spacing">
        <Button colorScheme="green" onClick={() => openRAK()}>
          {showModalButtonText}
        </Button>
      </Row>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" mr={3} onClick={completeRAK}>
              I did it!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

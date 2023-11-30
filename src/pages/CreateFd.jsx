import { useState } from "react";
import { createFd } from "../services/user-service";
import { toast } from "react-toastify";
import {Button,Card,CardBody,CardHeader,Col,Container,Form,FormFeedback,FormGroup,Input,Label,Row} from "reactstrap";
import Base from "../components/Base";

const CreateFd = () => {

  //const currAccount = JSON.parse(localStorage.getItem("account"));

  const [data, setData] = useState(
    {
      fd_amount: "",
      interest_Rate: "",
      maturity_amount: "",
      tenor: ""
  }
  );

  const [acc, setAccount] = useState(
    {
      accountId: ""
  }
  );

  // const acc ={
  //   accountId:''
  // }

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const handleChange1 = (event, property) => {
    setAccount({ ...acc, [property]: event.target.value });
    console.log(acc);
  };

  // const setAccount=(event,property)=>{
  //   acc.accountId=event.target.value;
  //   console.log(property);
  //   console.log(acc.accountId);
  // }

  const resetData = () => {
    setData(
      {
        fd_amount: "",
        interest_Rate: "",
        maturity_amount: "",
        tenor: ""
    }
    );
    setAccount({
      accountId:""
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    createFd(acc.accountId, data)
      .then((resp) => {
        console.log(resp);
        toast.success("Fixed Deposit created successfully !!");
        setData({
          fd_amount: "",
          interest_Rate: "",
          maturity_amount: "",
          tenor: ""
        });
        setAccount({
          accountId:""
        });
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          {/* { JSON.stringify(acc) }  */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3> Fixed Deposit </h3>
              </CardHeader>
              
              <CardBody>

                <Form onSubmit={submitForm}>
                  
                  <FormGroup>
                    <Label for="fd_amount">Enter fd_amount</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="fd_amount"
                      onChange={(e) => handleChange(e, "fd_amount")}
                      value={data.fd_amount}
                      invalid={
                        error.errors?.response?.data?.fd_amount ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.fd_amount}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="interest_Rate">Enter interest_Rate</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="interest_Rate"
                      onChange={(e) => handleChange(e, "interest_Rate")}
                      value={data.interest_Rate}
                      invalid={
                        error.errors?.response?.data?.interest_Rate? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.interest_Rate}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="maturity_amount">Enter maturity_amount</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="maturity_amount"
                      onChange={(e) => handleChange(e, "maturity_amount")}
                      value={data.maturity_amount}
                      invalid={
                        error.errors?.response?.data?.maturity_amount? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.maturity_amount}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="tenor">Enter tenor</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="tenor"
                      onChange={(e) => handleChange(e, "tenor")}
                      value={data.tenor}
                      invalid={
                        error.errors?.response?.data?.tenor? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.tenor}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="accountId">Bank account Id</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="accountId"
                      onChange={(e) => handleChange1(e, "accountId")}
                      value={acc.accountId} />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light">
                      Create
                    </Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default CreateFd;
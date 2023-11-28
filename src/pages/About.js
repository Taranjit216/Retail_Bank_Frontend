import userContext from "../context/userContext";
import Base from "../components/Base";
import { useEffect } from "react";
import { loadAccount } from "../services/user-service";
import { Button, Card, CardBody, CardFooter, Table } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const About = () => {

   const Data = JSON.parse(localStorage.getItem("data"));
    
  useEffect(()=>{
    loadAccount(Data.user.id).then((data)=>{
       console.log(data);
       console.log(JSON.stringify(data));
       const acc = JSON.stringify(data);
       localStorage.setItem('account', acc);
    }).catch(error=>{
      console.log(error);
    })
  },[])
  
  const account = JSON.parse(localStorage.getItem("account"));
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/BankAccount`; 
    navigate(path);
  }

  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <h1>this is about page</h1>
          <p>we are building blog website</p>
          {console.log(object)}
          <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
           <h1>user id: {object.user.data.id}</h1>

           <div>
           <Button color="primary" className="px-4"
            onClick={routeChange}
              >
              check account details
            </Button>
          </div>
          {/* <div>
        <Card className='mt-2 border-0 rounded-0 shadow-sm'>
          <CardBody>
            <h3 className='text-uppercase'>Account Information</h3>
            <Table responsive striped hover bordered={true} className='text-center mt-5'>
              <tbody>
                <tr>
                  <td >
                    ACCOUNT NO
                  </td>
                  <td>
                    {account[0].account_number}
                  </td>
                </tr>

                <tr>
                  <td >
                  account_type
                  </td>
                  <td>
                    {account[0].account_type}
                  </td>
                </tr>

                <tr>
                  <td >
                  balance
                  </td>
                  <td>
                    {account[0].balance}
                  </td>
                </tr>

                <tr>
                  <td >
                  updated_at
                  </td>
                  <td>
                    {account[0].updated_at}
                  </td>
                </tr>
                
              </tbody>
            </Table>



          </CardBody>
          <CardFooter className='text-center'>
            <Button color='success'>Update Profile</Button>
          </CardFooter>
        </Card>
        
      </div> 
       */}
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
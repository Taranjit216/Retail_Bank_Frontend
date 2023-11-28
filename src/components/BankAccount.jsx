import { Button, Card, CardBody, CardFooter, Table } from 'reactstrap';
import Base from './Base';
const BankAccount = () => {
  
  const account = JSON.parse(localStorage.getItem("account"));
 
  return (
    <Base>
          <div>
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
         
        </Card>
        
      </div> 
      </Base>
  );
};

export default BankAccount;
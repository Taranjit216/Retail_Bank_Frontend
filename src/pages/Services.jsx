import userContext from "../context/userContext"
import Base from "../components/Base"
// import { useEffect } from "react";
// import { loadAllAccount } from "../services/user-service";
import { Card, CardBody, Table } from 'reactstrap';

const Services = () => {

    

    const account = JSON.parse(localStorage.getItem("Allaccount"));

    // useEffect(()=>{
    //     loadAllAccount().then((data)=>{
    //        const Allaccount = JSON.stringify(data);
    //        localStorage.setItem('Allaccount', Allaccount);
    //        const accounts = JSON.parse(localStorage.getItem("Allaccount"));


    //     }).catch(error=>{
    //       console.log(error);
    //     })
    //   },[])

    return (
        <userContext.Consumer>
            {
                (object) => (

                    <Base>
                        <h1>
                            This is services page
                        </h1>
                        <h1>Welcome {object.user.login && object.user.data.name}</h1>
                    
                        
                        {account.map((elements)=>{
                      return <div key={elements.account_id}>   
        <Card className='mt-2 border-0 rounded-0 shadow-sm'>
          
          <CardBody>
            {/* <h3 className='text-uppercase'>Account Information</h3> */}
            <Table responsive striped hover bordered={true} className='text-center mt-5'>
              <tbody>
                <tr>
                  <td >
                    ACCOUNT {elements.account_id}
                  </td>
                  <td>
                    {elements.account_number}
                  </td>
                </tr>

                <tr>
                  <td >
                  account_type
                  </td>
                  <td>
                    {elements.account_type}
                  </td>
                </tr>

                <tr>
                  <td >
                  balance
                  </td>
                  <td>
                    {elements.balance}
                  </td>
                </tr>

                <tr>
                  <td >
                  updated_at
                  </td>
                  <td>
                    {elements.updated_at}
                  </td>
                </tr>
                
              </tbody>
            </Table>



          </CardBody>
          
        </Card>
      </div>
    })}        
                    </Base>
                )
            }
        </userContext.Consumer>
    )
}

export default Services
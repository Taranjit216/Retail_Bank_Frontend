import userContext from "../context/userContext"
import Base from "./Base"
import { useEffect, useState } from "react";
import { loadAllAccount, transferMoney } from "../services/user-service";
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row, Table } from 'reactstrap';
import { toast } from "react-toastify";

const TransferMoney = () => {

    const [data, setData]=useState({
      account_id:'0',
      balance:'',
      
    })

    const [error, setError] = useState({
      errors: {},
      isError: false,
    });

    const handleChange=(event,property)=>{
      setData({...data,[property]:event.target.value})
    }

    const account = JSON.parse(localStorage.getItem("Allaccount"));
    const currAccount = JSON.parse(localStorage.getItem("account"));

    var bal1="", bal2="";
    

    const submitForm = (event) => {
      event.preventDefault();
      console.log(data);

      if(data.account_id!='0')
      { 
        var num1 = parseInt(data.account_id)-1;
        bal1 = parseInt(account[num1].balance) + parseInt(data.balance);
       setData({...data, balance:bal1});
       console.log(bal1)
      }
      else{
        bal1 = parseInt(account[0].balance) + parseInt(data.balance);
       setData({...data, balance:bal1});
       console.log(bal1)
      }
  
      //call server api for sending data
      transferMoney(data.account_id,data)
        .then((resp) => {
          console.log(resp);
          console.log("success");
          toast.success("money transfer successfully !! to account id " + resp.id);
          // setData({
          //   account_id:'',
          //   balance:'',
          // });
        })
        .catch((error) => {
          console.log(error);
          console.log("Error log");
          //handle errors in proper way
          setError({
            errors: error,
            isError: true,
          });
        });

       
      bal2 = parseInt(account[0].balance) - parseInt(data.balance);
       setData({...data, balance:bal2});
       console.log(bal2)
      

      //   //call server api for sending data
      transferMoney(currAccount[0].account_id,data)
      .then((resp) => {
        console.log(resp);
        // setData({
        //   account_id:'',
        //   balance:'',
        // });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
      });

    };
  
    // useEffect(()=>{
    //   console.log(data);
    // },[data]);

    return (
   <Base>

      

<div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                  {JSON.stringify(data)}
                                    <form onSubmit={submitForm}>
                                        <div className = "form-group">
                                            <label> Account_Id: </label>
                                            <input placeholder="Account Id" name="Account_Id" className="form-control" 
                                                 onChange={(e)=>handleChange(e,'account_id')}
                                                 value={data.account_id}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Balance: </label>
                                            <input placeholder="Balance" name="Balance" className="form-control" 
                                                 onChange={(e)=>handleChange(e,'balance')}
                                                 value={data.balance}/>
                                        </div>

                                        <button className="btn btn-success" name="submit">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>

   </Base>     
          )
}

export default TransferMoney;

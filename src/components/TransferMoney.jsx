import userContext from "../context/userContext"
import Base from "./Base"
import { useEffect, useState } from "react";
import { loadAllAccount, transferMoney1, transferMoney2 } from "../services/user-service";
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row, Table } from 'reactstrap';
import { toast } from "react-toastify";

const TransferMoney = () => {

    const [data, setData]=useState({
      account_id:'',
      balance:'',
      
    })
    // const [balance1, setBalance1]=useState({
    //   account_id:'0',
    //   balance:'',
      
    // })
    // const [balance2, setBalance2]=useState({
    //   account_id:'0',
    //   balance:'',
      
    // })
    const balance1 = {
      account_id:'',
      balance:'',
    }
    const balance2 ={
      account_id:'',
      balance:'',
    }

    const [error, setError] = useState({
      errors: {},
      isError: false,
    });

    const handleChange=(event,property)=>{
      setData({...data,[property]:event.target.value})
      const acc = JSON.stringify(data);
       localStorage.setItem('transfer', acc);
    }

    const account = JSON.parse(localStorage.getItem("Allaccount"));
    const currAccount = JSON.parse(localStorage.getItem("account"));

    var bal1 = { bal1:"" }
    var bal2 = {  bal2:"" }
    

    const submitForm = (event) => {
      event.preventDefault();
      //console.log(data);

      if(data.account_id=0){
        toast.success("account 0 does'nt exist");
        return;
      }

      // if(data.account_id!='0')
      // { 
        var num1 = parseInt(data.account_id)-1;
        bal1.bal1 = parseInt(account[num1].balance) + parseInt(data.balance);
      // setBalance1({...balance1,account_id:data.account_id, balance:bal1});
        balance1.account_id = data.account_id;
        balance1.balance = bal1.bal1;
      const acc1 = JSON.stringify(balance1);
       localStorage.setItem('balance1', acc1);
      //  console.log("this is money transfer",balance1);
      // }
      // else{
      //   bal1.bal1 = parseInt(account[0].balance) + parseInt(data.balance);
      //   //setBalance1({...balance1,account_id:data.account_id, balance:bal1});
      //   balance1.account_id = data.account_id;
      //   balance1.balance = bal1.bal1;
      //   const acc1 = JSON.stringify(balance1);
      //  localStorage.setItem('balance1', acc1);
      //  // console.log("this is money transfer",balance1)
      // }
  
      //call server api for sending data
      transferMoney1(balance1.account_id,balance1)
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

      const a = JSON.parse(localStorage.getItem('data')).user.id; 
      var b = a-1;
      bal2.bal2 = parseInt(account[b].balance) - parseInt(data.balance);
      //setBalance2({...balance2,account_id:data.account_id, balance:bal2});
      balance2.account_id = data.account_id;
      balance2.balance = bal2.bal2;
      const acc2 = JSON.stringify(balance2);
      localStorage.setItem('balance2', acc2);
      // console.log("this is money debited",balance2)
      

      //   //call server api for sending data
      transferMoney2(currAccount[0].account_id,balance2)
      .then((resp) => {
        console.log(resp);
        setData({
          account_id:'',
          balance:'',
        });
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
                                  {/* {JSON.stringify(data)} */}
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

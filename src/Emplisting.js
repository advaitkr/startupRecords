import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import _ from "lodash"
import './Emplisting.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
const pageSize = 10
const Emplisting = () => {
    const [data, setData] = useState(null)
    const [query,setQuery] = useState('')
    const [searchval,setSearchVal] = useState()
    const [order,setorder] = useState("ASC")
    const navigate = useNavigate()
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id)
    }
    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/data/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }

    }


    useEffect(() => {
        fetch("http://localhost:8000/data").then((res) => {
            return res.json();
        }).then((resp) => {
            setData(resp);
            console.log(resp)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
     const keys = ["name","email","role"]
    // const pages = _.range(1,pageCount+1)
    //console.log("pages",pages)
    // const Search =(data)=>{
    //     console.log(data,query)
    //      return data.filter((item)=>
    //            {
    //             const val = keys.some((key)=>item[key].toLowerCase().includes(query))
    //             setSearchVal(val)
    //            }
    //      )
    // }
   const sorting = (col)=>{
         if(order === "ASC"){
             const sorted = [...data].sort((a,b)=>
                a[col] > b[col] ? 1 : -1
             )

             setorder(sorted)
         }
  }
   
    console.log(data, "data")
    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     navigate(`/search?name=${search}`)
    //     setSearch("")
    // }

    return (
        <div className="container">
            <div className="card">
            <form 
                    style={{display:"inline",margin:"60px 10p 20px 0",padding:"20px"}}
                    >
                        
                        <input 
                         type="text"
                         style={{height:"40px",width:"15rem",float:"right",borderStyle:"solid",borderColor:"skyblue"}}
                         className='inputField'
                         placeholder='Search ...'
                         onChange={(e)=>setQuery(e.target.value)}
                         value={query}
                         />
                    </form>
                <div className="card-title">
                <h1>records</h1>
                </div>
                
                <div className="card-body">

                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {data &&
                                data.filter((item)=>{
                                      if(query == ""){
                                          return item
                                    }
                                    else{
                                        return keys.some((key)=>item[key].toLowerCase().includes(query))
                                    }
                                }).map(item => (
                                    <tr key={item.id}>
                                        <td onClick={()=>sorting(item.id)}>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button
                                                onClick={() => { LoadEdit(item.id) }}
                                                type="button"
                                                class="btn btn-success"><EditIcon /></button>
                                            <button
                                                onClick={() => { RemoveFunction(item.id) }}
                                                type="button"
                                                class="btn btn-success"><DeleteIcon /></button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
    
                </div>
            </div>
        </div>

    )
}

export default Emplisting

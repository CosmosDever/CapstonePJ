import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Setting.css";
import Sidebar from "../Components/Sidebar";
import { Icon } from '@iconify/react';




function Setting() {
    const [api_popup, setapi_popup] = useState(false)
    const [changepass_popup, setchangepass_popup] = useState(false)

    const [api_key,setApi_key] = useState('')
    const [secret_key,setSecret_key] = useState('')

    const [old_pass,setOld_pass] = useState('')
    const [new_pass,setNew_pass] = useState('')
    const [confirm_newpass,setConfirm_newpass] = useState('')

    const [showapi, setApi] = useState(false);
    const [showsecret, setSecret] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [changeeye1, setChangeeye1] = useState(false);
    const [changeeye2, setChangeeye2] = useState(false);
    const [changeeye3, setChangeeye3] = useState(false);
    const [changeeyeapi, setChangeeyeapi] = useState(false);
    const [changeeyesecret, setChangeeyesecret] = useState(false);
    const [username,setUsername] = useState('') 
    const [email,setEmail] = useState('')
    

    // const Api_submit =async(e)=> {
    //     e.preventDefault()
    //     try {
    //         const response = await axios.post('http://localhost:3605/Account/setapi', {api_key,secret_key});
    //         console.log('setapi success')
    //         console.log(response.data)
    //         // เพิ่มโค้ดเพื่อประมวลผลการตอบกลับจากเซิร์ฟเวอร์ที่คุณต้องการทำต่อไป
    //       } catch (error) {
    //         console.error('Error posting data: ', error);
    //       }
    // }
    // useEffect(() => {
    //     const fetchUsername = async () => {
    //         try {
    //         const response = await axios.get('http://localhost:3605/Account/getuser');
    //         setUsername(response.data.username);
    //         } catch (error) {
    //         console.error('Error fetching username: ', error);
    //         }
    //     };
    //     const fetchEmail = async () => {
    //         try {
    //         const response = await axios.get('http://localhost:3605/Account/getuser');
    //         setEmail(response.data.email);
    //         } catch (error) {
    //         console.error('Error fetching email: ', error);
    //         }
    //     };
        
        
    //     fetchUsername();
    //     fetchEmail();
    // }, []);


    const showandchangepassword1 =(e)=> {
        setShowPassword1(!showPassword1)
        setChangeeye1(!changeeye1)
    }
    const showandchangepassword2 =(e)=> {
        setShowPassword2(!showPassword2)
        setChangeeye2(!changeeye2)
    }
    const showandchangepassword3 =(e)=> {
        setShowPassword3(!showPassword3)
        setChangeeye3(!changeeye3)
    }
    const showandchangeapi =(e)=> {
        setApi(!showapi)
        setChangeeyeapi(!changeeyeapi)
    }
    const showandchangesecret =(e)=> {
        setSecret(!showsecret)
        setChangeeyesecret(!changeeyesecret)
    }

    const changepass_submit =(e)=> {
        e.preventDefault()
        if (new_pass.length < 8) {
                // กรณีที่รหัสผ่านมีความยาวน้อยกว่า 8 ตัวอักษร
            alert("โปรดใส่รหัสผ่านที่มีความยาวอย่างน้อย 8 ตัวอักษร");
            // ตรวจสอบว่ารหัสผ่านมีตัวอักษรอย่างน้อย 1 ตัว
        }else if (!new_pass.match(/[A-Z]/)) {
                // กรณีที่ไม่มีตัวอักษรในรหัสผ่าน
            alert("โปรดใส่รหัสผ่านที่มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว");
        }
        else if (new_pass === confirm_newpass) {
                // กรณีที่รหัสผ่านถูกต้อง
            console.log("รหัสผ่านถูกต้อง"); 
            setchangepass_popup(false)
        }else {
            // กรณีที่รหัสผ่านไม่ตรงกัน
            console.log("โปรดใส่รหัสผ่านให้ถูกต้อง");
            // สามารถแสดงข้อความหรือทำการแจ้งเตือนผู้ใช้งานว่ารหัสผ่านไม่ตรงกันได้ที่นี่
            alert("โปรดใส่รหัสผ่านให้ถูกต้อง");
        }
    
    }

    return (
        <> 
        <Sidebar/>
        <div className="background" >
            <div className="mail_setting"> E-mail</div>
            <div className="mail_box"></div>
            <div className="mail_text">{email}</div>
            <div className="user_setting"> Username </div>
            <div className="user_box"></div>
            <div className="user_text">{username}</div>
            <div className="change_box">
                <button onClick={() => setapi_popup(true)} className="setapi_button"> Set up your API Key</button>
                <div className={api_popup?'position_popup':'position_popup closeposition_popup'}>
                    <form onSubmit={(e)=>Api_submit(e)} className='startapi_popup' >
                        <Icon onClick={() => setapi_popup(false)} className="close_icon" icon="material-symbols:close" width="30" height="30"/>
                        <Icon className="icon_api" icon="mdi:api" width="90" height="90" />
                        <div className="textapi">Api Key</div>
                        <div style={{position:'relative'}}>
                            <input 
                                type={showapi ? 'text' : 'password'}
                                required 
                                onChange={(e)=>setApi_key(e.target.value)} 
                                value={api_key} 
                                className="inputapi_key">
                            </input> 
                            <Icon 
                                    className="showpass" 
                                    icon={changeeyeapi? "mdi:eye-off":"mdi:eye"} width="30" height="30"  style={{color: 'black'}} 
                                    onClick={()=> showandchangeapi()}/>
                            <div className="textsecret">Secret Key</div>
                        </div> 
                        <div style={{position:'relative'}}>
                            <input 
                                type={showsecret ? 'text' : 'password'} 
                                required 
                                onChange={(e)=>setSecret_key(e.target.value)} 
                                value={secret_key} 
                                className="inputsecret_key">
                            </input>
                            <Icon 
                                    className="showpass" 
                                    icon={changeeyesecret? "mdi:eye-off":"mdi:eye"} width="30" height="30"  style={{color: 'black'}} 
                                    onClick={()=> showandchangesecret()}/>
                        </div>       
                        <button type="submit" className="submit_button"> Submit </button>
                    </form>
                </div>

                <button onClick={() => setchangepass_popup(true)} className="changepass_button"> Change Password</button>
                <div className={changepass_popup?'position_popup':'position_popup closeposition_popup'}>
                    <form onSubmit={(e)=>changepass_submit(e)} className="startchangepass_popup">
                        <Icon onClick={() => setchangepass_popup(false)} className="close_icon" icon="material-symbols:close" width="30" height="30"/>
                        <Icon className="icon_password" icon="solar:lock-password-broken" width="90" height="90" />
                        <div className="textchangepass">Old Password</div>   
                        <div style={{position:'relative'}}>
                            <input 
                                type={showPassword1 ? 'text' : 'password'}
                                value={old_pass} 
                                required 
                                onChange={(e)=>setOld_pass(e.target.value)}  
                                className="input_oldpassword">
                            </input> 
                            <Icon 
                                className="showpass" 
                                icon={changeeye1? "mdi:eye-off":"mdi:eye"} width="30" height="30"  style={{color: 'black'}} 
                                onClick={()=> showandchangepassword1()}/>
                        </div>

                        <div className="textnewpass">New Password</div>
                        <div style={{position:'relative'}}>
                            <input 
                                type={showPassword2 ? 'text' : 'password'} 
                                required 
                                onChange={(e)=>setNew_pass(e.target.value)} 
                                value={new_pass} 
                                className="input_newpassword">
                            </input> 
                        <Icon 
                                className="shownewpass" 
                                icon={changeeye2? "mdi:eye-off":"mdi:eye"} width="30" height="30"  style={{color: 'black'}} 
                                onClick={()=> showandchangepassword2()}/>
                        </div>
                        <div className="textnewpass">Confirm New Password</div>
                        <div style={{position:'relative'}}>
                            <input 
                                type={showPassword3 ? 'text' : 'password'}
                                required 
                                onChange={(e)=>setConfirm_newpass(e.target.value)} 
                                value={confirm_newpass} 
                                className="input_newpassword">    
                            </input>    
                        <Icon 
                                className="showconfirmpass" 
                                icon={changeeye3? "mdi:eye-off":"mdi:eye"} width="30" height="30"  style={{color: 'black'}} 
                                onClick={()=> showandchangepassword3()}/>
                        </div>
                        <button type="submit" className="submit_button"> Submit </button>
                    </form>
                </div>
            </div>
        </div>    
               
        

        </>
    )

}

export default Setting
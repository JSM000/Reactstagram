
import React, { useState } from 'react';
import { authService,firebaseInstance } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function HistorySample() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [newAccount, setNewAccount] = useState(true);

   // 로그인시 이벤트 
   const onChange = (event) => {
      const { target: { name, value } } = event;
      if (name === 'email') { setEmail(value) }
      else if (name === "password") { setPassword(value); }
   }

   const onSubmit = async (event) => {
      event.preventDefault();
      try {
         let data; 
         if (newAccount) {
            /// 새로운 유저 생성 
            data = await authService.createUserWithEmailAndPassword(email, password);
         } else { // 회원가입 한 유저가 로그인시 이벤트
            data = await authService.signInWithEmailAndPassword(email, password);
         } console.log(data);
      } catch (error) {
         console.log(error)
      }
   }

   // const onSubmit = async (event) => {
   //    event.preventDefault();
   //    try {
   //       let data; 
   //       if (newAccount) {
   //          / 새로운 유저 생성 
   //          data = await authService.createUserWithEmailAndPassword(email, password);
   //       } else { // 회원가입 한 유저가 로그인시 이벤트
   //          data = await authService.signInWithEmailAndPassword(email, password);
   //       } console.log(data);
   //    } catch (error) {
   //       console.log(error)
   //    }
   // }

   const toggleAccount = () => setNewAccount((prev) => !prev);


   const onGoggleClick = async(event) => {
      const {target: {name}} = event;
      let provider; 
      if (name === 'google') { 
         provider = new firebaseInstance.auth.GoogleAuthProvider(); 
      }
         const data = await authService.signInWithPopup(provider); 
         console.log(data); 
      }



   return (
      <>
         <div>
            <form onSubmit={onSubmit}>
               <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
               <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
               {/* 로그인 했다 ?? 하면 회원가입 유저와 기존 유저가 로그인할때를 구분해줌 */}
               <input type="submit" value={newAccount ? "Create Account" : "Login"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Login" : "Craete Account"}</span>
         </div>
            <button onClick={onGoggleClick} name='google'>구글로그인</button>

            
      </>);


}
export default HistorySample;
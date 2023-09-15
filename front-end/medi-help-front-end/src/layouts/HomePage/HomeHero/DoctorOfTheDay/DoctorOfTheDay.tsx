// export const DoctorOfTheDay = () =>{
//   return (

//   <div className="d-flex min-vh-100">
//     <div className="container align-self-right">
  
//       <div className="row justify-content-right">
  
//         <div className="col-12 col-lg-8 col-xl-6 text-center">
  
//           <div className="lc-block mb-2">
//             <img className="img-fluid w-75" alt="Doctor" src={require("./../../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")}/>
//             </div>
//           <div className="lc-block mb-4">
//             <div>
//               <h5>Doctor Pushpita Amin</h5>
//               <p>She  is specialist in Psychology. People from all over the country come to popular diagnosise center, Dhanmondi to visit her.</p>
//             </div>
//           </div>
  
//         </div>
//       </div>
//     </div>
  
  
  
//   </div>
//   )
// }
export const DoctorOfTheDay = () => {
  return (
    <div className="d-flex min-vh-100">
      <div className="container align-self-left">
        <div className="row d-flex justify-content-end">
          <div className="col-25 col-lg-20 col-xl-6 text-center">
            <div>
            <h4 style={{ color: 'white', background: 'blue', padding: '5px', fontWeight: 'bold' }}>DOCTOR OF THE DAY!!!!</h4>
            </div>
            <div className="lc-block mb-2">
              {/* Increase the image size */}
              <img className="img-fluid w-100" alt="Doctor" src={require("./../../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")} />
            </div>
            <div className="lc-block mb-4">
              <div>
                {/* Apply smaller text style */}
                <h6 style={{ fontSize: '1.5rem' }}>Doctor Pushpita Amin</h6>
                <p style={{ fontSize: '1rem', textAlign: 'left' }}>She is a specialist in Psychology. People from all over the country come to popular diagnosise center, Dhanmondi, to visit her.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
    
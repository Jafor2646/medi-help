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
// export const DoctorOfTheDay = () => {
//   return (
//     // <div className="d-flex min-vh-20">
//     //   <div className="container">
//     //     <div className="row d-flex justify-content-center">
//     //       <div className="col-15 col-lg-10 col-xl-6 text-center">
//     //         <div>
//     //         <h4 style={{ color: 'white', background: 'blue', padding: '5px', fontWeight: 'bold' }}>DOCTOR OF THE DAY!!!!</h4>
//     //         </div>
//     //         <div className="lc-block mb-2">
//     //           {/* Increase the image size */}
//     //           <img className="img-fluid w-85" alt="Doctor" src={require("./../../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")} />
//     //         </div>
//     //         <div className="lc-block mb-4">
//     //           <div>
//     //             {/* Apply smaller text style */}
//     //             <p style={{ fontSize: '1.5rem' }}>Doctor Pushpita Amin</p>
//     //             <p style={{ fontSize: '1rem', textAlign: 'left' }}>She is a specialist in Psychology. People from all over the country come to popular diagnosise center, Dhanmondi, to visit her.</p>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
    
//   );
// }; 

export const DoctorOfTheDay = () => {
  return (
    <div className="swiper-slide h-100">
				<div className="card shadow mx-auto">
					<div className="card-body">
            <h4 style={{ color: 'white', background: 'blue', padding: '5px', fontWeight: 'bold', fontSize: '30px'}}>DOCTOR OF THE DAY!!!!</h4>
						<div className="lc-block">
							<img className="img-fluid" src= {require("./../../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")}sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="1080" alt="Doctor Of The Day" loading="lazy"/>
						</div>
						<div className="card-body">
							<div className="lc-block mb-3">
								<div>

									<h2 className="h5">Doctor Pushpita Amin</h2>

									<p>She is a specialist in Psychology. People from all over the country come to popular diagnosise center, Dhanmondi, to visit her.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    
  );
}; 
    
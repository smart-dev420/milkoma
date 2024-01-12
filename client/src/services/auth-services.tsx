import jwtAuthAxios from "./auth/jwtAuth";

// const authServices: {
//     getCurrentUser: () => Promise<string | null>;
//     signIn: (loginCreds: { email: string; password: string }) => Promise<any>;
//   } = {
//       getCurrentUser: function (): Promise<string | null> {
//         //   throw new Error("Function not implemented.");
//           throw new Error("Function not implemented.");
//       },
//       signIn: function (loginCreds: { email: string; password: string; }): Promise<any> {
//           throw new Error("Function not implemented.");
//       }
//   };

// authServices.getCurrentUser = async () => {
//     const user = localStorage.getItem("user");
//     return user;
// };

// //loginCreds must be {email: "abc@example.com", password: "ABC123DEF"}
// authServices.signIn = async (loginCreds) => {
//     const {data} = await jwtAuthAxios.post('/auth', loginCreds);
//     return data;
// };

// export default authServices;
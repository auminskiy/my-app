import * as Yup from "yup";



const couponFormShema = Yup.object().shape({
  

    stake: Yup
    .number()
    .positive()
    .label('seats')
    .required('pls enter')
    .min(1),
  });
     

export default couponFormShema;
import Box from '@mui/material/Box';

import { useTheme,
        TextField,
        useMediaQuery,
        Button
} from '@mui/material';

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";


//Intialization the form with null values.
const intitialPassUpdate = {
    email: "",
    password: "",
    newpassword: "",
}

//Creating form schema for the updation Form.
const updateSchema = yup.object().shape({
    email:  yup.string().email("Invalid email").required("required"),
    password:   yup.string().required("required"),
    newpassword: yup.string().required("required")
})


const UpdateForm = () => {

    const {palette}  = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = "Login";


    //Register for updatePassword.
    const updateRegister = async(values, onSubmitProps) => {

        const formData = new FormData();
        for(let value in values) {
            formData.append(value, values[value]);
        }
        
        //Hitting the "http://localhost:3001/auth/password" endpoint using fetch 
        const updateUserData = await fetch(
            "http://localhost:3001/auth/password",
            {
                method : "PATCH",
                body : formData,
            }
        );
        
        //Getting the json response from the user.
        const updateUser = await updateUserData.json();
        onSubmitProps.resetForm();
        
        //if updateUser is there it will hit the database and retrieve the user.
        if(updateUser){
            dispatch(
                setLogin({
                    user: updateUser.user,
                    token: updateUser.token,
                })
            )
            navigate("/home");
        }
    

    };

    //Frontend for the update Form.
    const handleFormSubmit = async (values, onSubmitProps) => {

        if(isLogin) await updateRegister(values, onSubmitProps);

    }

        return (

            <Formik
            onSubmit={handleFormSubmit}
            initialValues={intitialPassUpdate}
            validationSchema={updateSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) =>(
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div" : {
                                    gridColumn : isNonMobile ? undefined : "span 4"},
                                
                            }}
                        >
                            
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name = "email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx ={{gridColumn: "span 4"}}
                                />
                            <TextField
                                label="Password"
                                type='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name = "password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx ={{gridColumn: "span 4"}}
                                />
                            
                            <TextField
                                label="New Password"
                                type='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.newpassword}
                                name = "newPassword"
                                error={Boolean(touched.newpassword) && Boolean(errors.newpassword)}
                                helperText={touched.newpassword && errors.newpassword}
                                sx ={{gridColumn: "span 4"}}
                                />

                            

                        </Box>

                        <Box>
                            <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m:"2rem 0",
                                p: "1rem",
                                backgroundColor : palette.primary.main,
                                color : palette.background.alt,
                                "&:hover" : {color: palette.primary.main},
                            }}>
                                Update Password
                            </Button>
                        </Box>
                    </form>
                )}

            </Formik>
        )


}

export default UpdateForm;
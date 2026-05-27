const handleLogin = async () => {

    try {

        const response = await axios.post(
            "https://hospital-management-backend-u64d.onrender.com/auth/login",
            {
                username,
                password
            }
        );

        console.log("LOGIN RESPONSE:", response.data);

        if(response.data) {

            localStorage.clear();

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            const savedUser =
                JSON.parse(
                    localStorage.getItem("user")
                );

            console.log("SAVED USER:", savedUser);

            alert(
                "Login Successful: " +
                savedUser.role
            );

            window.location.replace("/");

        }

        else {

            alert("Invalid Credentials");
        }
    }

    catch(error) {

        console.log(error);

        alert("Login Failed");
    }
};
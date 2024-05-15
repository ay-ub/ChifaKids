import { Notify } from "utils";
const login = async (data, auth, navigate, redirectPath) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.status === "success") {
      auth.login(resData.data.user);
      Notify({
        type: "success",
        message: `bienvenue ${resData.data.user.firstName} ${resData.data.user.lastName}`,
      });
      navigate(redirectPath, { replace: true });
    } else {
      Notify({
        type: "error",
        message: resData.message,
      });
    }
  } catch (err) {
    Notify({
      type: "error",
      message: "Veuillez vérifier votre connexion.",
    });
  }
};

export { login };

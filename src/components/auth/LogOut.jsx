import { signOut } from "firebase/auth";

const LogoutButton = ({ auth, setUser, setShowSignIn, setShowSignUp }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Establecer el usuario como null
      setShowSignIn(true); // Mostrar componentes de inicio de sesión
      setShowSignUp(false); // Ocultar otros componentes
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;

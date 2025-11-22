import { useNavigate } from "react-router-dom";

const ProtectAdminUsersView = ({ currentUser, children }) => {
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== "admin") {
    navigate("/");
    return null;
  }

  return <>{children}</>;
};
export default ProtectAdminUsersView;

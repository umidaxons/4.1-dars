import { useState } from "react";
import AddModal from "./components/AddModal";
import LoginModal from "./components/LoginModal";
import Header from "./components/Header";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  function handleNewClick() {
    if (isLoggedIn) {
      setShowAddModal(true);
    } else {
      setShowLoginModal(true);
    }
  }

  function handleLoginSuccess() {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  }

  return (
    <>
      <Header onNewClick={handleNewClick} />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <AddModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  );
}

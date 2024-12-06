import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

const AvatarMenu: React.FC = () => {
  const handleLogout = () => {
    logout();
    Cookies.remove("email");
    // Add your logout logic here
  };
  const { user, logout } = useAuth0();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh",
        position: "fixed",
        bottom: 0,
        paddingBottom: "20px",
        // zIndex: 999,
      }}
    >
      <DropdownMenu.Root>
        {/* Avatar Trigger */}
        <DropdownMenu.Trigger asChild>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Root
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#ccc",
                cursor: "pointer",
              }}
            >
              <Avatar.Image
                // src="https://via.placeholder.com/150"
                alt="User Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Avatar.Fallback
                style={{
                  // width: "100%",
                  // height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                U
              </Avatar.Fallback>
            </Avatar.Root>
            <p
              style={{
                width: "120px",
                paddingLeft: "10px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user ? user.email : "TEST"}
            </p>
          </div>
        </DropdownMenu.Trigger>

        {/* Dropdown Menu Content */}
        <DropdownMenu.Content
          side="top"
          align="end"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            minWidth: "120px",
            // zIndex: 1000,
          }}
        >
          <DropdownMenu.Item
            style={{
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onSelect={() => console.log("Profile clicked")}
          >
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item
            style={{
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onSelect={() => console.log("Settings clicked")}
          >
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator
            style={{
              height: "1px",
              backgroundColor: "#eee",
              margin: "8px 0",
            }}
          />
          <DropdownMenu.Item
            style={{
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#ff4d4f",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onSelect={handleLogout}
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default AvatarMenu;

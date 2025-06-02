import React from "react";
import { Link as RouteLink, useLocation } from "react-router";
import { Avatar, Flex, Tabs } from "@chakra-ui/react";

const MyNav = () => {
  let location = useLocation();

  const routeToTab = {
    "/home": "home",
    "/search": "search",
    "/add": "new super",
  };

  const currentTab = routeToTab[location.pathname] || "home";

  return (
    <div style={styles.nav}>
      <h1 style={styles.head}>Supers</h1>
      <div style={styles.tabs}>
        <Tabs.Root value={currentTab}>
          <Tabs.List>
            <Flex wrap="wrap" maxW="900px">
              <Tabs.Trigger value="home" asChild>
                <RouteLink to="/home">Home</RouteLink>
              </Tabs.Trigger>

              <Tabs.Trigger value="new super" asChild>
                <RouteLink to="/add">New Supers</RouteLink>
              </Tabs.Trigger>
            </Flex>
          </Tabs.List>
        </Tabs.Root>
      </div>
      <div style={styles.avatar}></div>
    </div>
  );
};
export default MyNav;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1A365D",
    borderBottom: "1px solid #fff",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontWeight: "bold",
  },
  head: {
    color: "white",
    textAlign: "left",
    fontSize: "1.4rem",
    width: "30vw",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-around",
    width: "30vw",
  },
  avatar: {
    width: "30vw",
    display: "flex",
    justifyContent: "flex-end",
  },
};

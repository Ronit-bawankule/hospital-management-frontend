import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import PeopleIcon from "@mui/icons-material/People";

import EventIcon from "@mui/icons-material/Event";

import { Link } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#1976d2",
                    color: "white"
                }
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold"
                    }}
                >

                    Hospital HMS

                </Typography>

            </Toolbar>

            <List>

                <ListItem disablePadding>

                    <ListItemButton
                        component={Link}
                        to="/"
                    >

                        <ListItemIcon
                            sx={{ color: "white" }}
                        >

                            <DashboardIcon />

                        </ListItemIcon>

                        <ListItemText
                            primary="Dashboard"
                        />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton
                        component={Link}
                        to="/add-patient"
                    >

                        <ListItemIcon
                            sx={{ color: "white" }}
                        >

                            <PersonAddIcon />

                        </ListItemIcon>

                        <ListItemText
                            primary="Add Patient"
                        />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton
                        component={Link}
                        to="/patients"
                    >

                        <ListItemIcon
                            sx={{ color: "white" }}
                        >

                            <PeopleIcon />

                        </ListItemIcon>

                        <ListItemText
                            primary="Patient Records"
                        />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton
                        component={Link}
                        to="/appointments"
                    >

                        <ListItemIcon
                            sx={{ color: "white" }}
                        >

                            <EventIcon />

                        </ListItemIcon>

                        <ListItemText
                            primary="Appointments"
                        />

                    </ListItemButton>

                </ListItem>

            </List>

        </Drawer>
    );
}

export default Sidebar;
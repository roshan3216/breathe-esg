import { createSlice } from "@reduxjs/toolkit";
import Analytics from "../../pages/menu/analytics";
import Dashboard from "../../pages/menu/dashboard";
import DataManager from "../../pages/menu/dataManager";
import EntityManager from "../../pages/menu/entityManager";
import Materiality from "../../pages/menu/materiality";
import Reporting from "../../pages/menu/reporting";
import Suppliers from "../../pages/menu/suppliers";
import Targets from "../../pages/menu/targets";


export const menuItemsPage = {
    'analytics': Analytics,
    'dashboard' : Dashboard,
    'dataManager': DataManager,
    'entityManager': EntityManager,
    'materiality' : Materiality,
    'reporting': Reporting,
    'suppliers': Suppliers,
    'targets' : Targets,
}

type MenuItemsPage = keyof typeof menuItemsPage;

type InitialState = {
    menuItemKey : MenuItemsPage,
};

const initialState : InitialState = {
    menuItemKey: "dataManager",
};

const pageControlSlice = createSlice({
    name: "page",
    initialState,
    reducers : {
        control: (state, action ) => {
            state.menuItemKey = action.payload;
        }
    }
});

export default pageControlSlice.reducer;
export const {control : pageControl} = pageControlSlice.actions;
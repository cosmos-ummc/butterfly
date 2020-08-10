import {Filter, TextInput} from "react-admin";
import React from "react";

export const CustomFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);

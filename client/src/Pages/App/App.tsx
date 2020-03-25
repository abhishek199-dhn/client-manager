import React from "react";
import styles from "./app.module.scss";

const App = (props: { children: React.ReactNode }) => {
    return (
        <div className={styles.app}>
            {props.children}
        </div>
    );
};

export default App;
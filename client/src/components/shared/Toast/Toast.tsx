import React from "react";
import styles from "./toast.module.scss";

interface Props {
    message: string
}

function Toast({message}: Props) {
    return (
        <div className={styles.toastContainer}>{message}</div>
    )
}

export default Toast;
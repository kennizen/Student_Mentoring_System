import { toast } from "react-toastify";

export const showToast = (type, content, autoClose, onClose) => {
    if (type === "success") {
        toast.success(content, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            autoClose: autoClose,
            onClose: onClose === undefined ? () => {} : () => onClose(),
        });
    } else if (type === "error") {
        toast.error(content, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            autoClose: autoClose,
            onClose: onClose === undefined ? () => {} : () => onClose(),
        });
    } else if (type === "info") {
        toast.info(content, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            autoClose: autoClose,
            onClose: onClose === undefined ? () => {} : () => onClose(),
        });
    }
};

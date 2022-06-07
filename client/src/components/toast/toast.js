import { toast } from "react-toastify";

export const showToast = (type, content, autoClose, position, onClose) => {
    if (type === "success") {
        toast.success(content, {
            position: position,
            theme: "colored",
            autoClose: autoClose,
            onClose: onClose === undefined ? () => {} : () => onClose(),
        });
    } else if (type === "error") {
        toast.error(content, {
            position: position,
            theme: "colored",
            autoClose: autoClose,
            onClose: onClose === undefined ? () => {} : () => onClose(),
        });
    } else if (type === "info") {
        toast.info(content, {
            position: position,
            theme: "colored",
            autoClose: autoClose,
            onClose: onClose === undefined ? () => {} : () => onClose(),
        });
    }
};

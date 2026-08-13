import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const confirmAction = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, proceed",
  cancelButtonText = "Cancel",
}) => {
  const result = await MySwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText,
    cancelButtonText,
    background: "#ffffff",
    color: "#111827",
    customClass: {
      popup: "swal2-popup-custom",
      title: "swal2-title-custom",
      htmlContainer: "swal2-html-custom",
      confirmButton: "swal2-confirm-custom",
      cancelButton: "swal2-cancel-custom",
    },
  });

  return result.isConfirmed;
};

import { toast } from 'react-toastify';

class ToastHelper {
  options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  showSuccess = (message) => toast.success(message, this.options)
  showError = (message) => toast.error(message, this.options)
}

export default new ToastHelper();
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const BG_GOOD_ALERTS = "#23C552";
const TEXT_GOOD_ALERTS = "#000000";

const BG_BAD_ALERTS = "#D0342C";
const TEXT_BAD_ALERTS = "#FFFFFF";

export const sendAlertMessage = (message, type) => {
    Toastify({
        text: message,
        duration: 2500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: (type == "good") ? BG_GOOD_ALERTS : BG_BAD_ALERTS,
          color: (type == "good") ? TEXT_GOOD_ALERTS : TEXT_BAD_ALERTS,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
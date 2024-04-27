import React, { useState } from "react";
import { Alert } from "react-bootstrap";

import "../../css/messagealert.css";

const DeleteAlert = ({ variant, message }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      {show && (
        <div className="message_alert_overlay">
          <div className="message_alert_container">
            <Alert variant={variant}>
              <div className="message_alert_modal_dialog message_alert_modal_confirm">
                <div className="message_alert_modal_content">
                  <div className="message_alert_modal_header flex-column">
                    {/*здесь должен быть серьезный котик*/}
                    <h4 className="message_alert__modal_title w-100">
                      Вы уверены?
                    </h4>
                    <button
                      onClick={handleClose}
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="message_alert_modal_body">
                    <p>{message}</p>
                  </div>
                  <div className="message_alert_modal_footer justify-content-center">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="message_alert_btn message_alert_btn_secondary"
                      data-dismiss="modal"
                    >
                      Отмена
                    </button>
                    <button type="button" className="message_alert_modal_confirm message_alert_btn_danger">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAlert;

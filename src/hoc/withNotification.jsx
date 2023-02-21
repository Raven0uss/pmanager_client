import NotificationContext from "../contexts/NotificationContext";

const openNotification =
  (notificationApi) =>
  ({ message, description, type }) => {
    switch (type) {
      case "info":
      case "success":
      case "warning":
      case "error":
        notificationApi[type]({
          message,
          description,
          placement: "bottomRight",
        });
        break;
      default:
        return;
    }
  };

const withNotificationContext = (Component) => (props) =>
  (
    <NotificationContext.Consumer>
      {({ notificationApi }) => (
        <Component
          {...props}
          openNotification={openNotification(notificationApi)}
        />
      )}
    </NotificationContext.Consumer>
  );

export default withNotificationContext;

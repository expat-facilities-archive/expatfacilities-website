const openMailbox = (email: string): void => {
  const hostname = email.substring(email.lastIndexOf("@") + 1);
  if (email.length > 0 && hostname.length > 0) {
    switch (hostname) {
      case "gmail.com":
        window.open("http://gmail.com", "_blank");
        break;
      case "yahoo.com":
        window.open("http://yahoo.com", "_blank");
        break;
      case "hotmail.com":
      case "hotmail.fr":
      case "outlook.com":
        window.open("http://outlook.com", "_blank");
        break;
      default:
        window.open(`http://mail.${hostname}`, "_blank");
        break;
    }
  }
};

export default openMailbox;

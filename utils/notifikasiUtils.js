export const sendNotification = (title, message, pesan_waktu) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support system notifications");
    return;
  }

  if (Notification.permission === "granted") {
    createNotification(title, message, pesan_waktu);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        createNotification(title, message, pesan_waktu);
      }
    });
  }
};

export const createNotification = (title, message, pesan_waktu) => {
  const notification = new Notification(`Hai ${title},`, {
    body: `Waktu pengerjaan tugas ${message} ${pesan_waktu}`,
    icon: "",
  });
  notification.close();
};

import LogoDalam from "@/public/logo_dalam.png";
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
    icon: `https://firebasestorage.googleapis.com/v0/b/ayo-nugas-26cd4.appspot.com/o/logo_title.png?alt=media&token=10ee01a3-6969-47c0-a537-7a3e414a080c`,
    renotify: false,
    // tag: "tagName",
  });
  notification.close();
};

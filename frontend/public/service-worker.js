self.addEventListener("push", async (event) => {
  const body = event.data?.text() ?? "no-content";
  event.waitUntil(
    self.registration.showNotification("habits", {
      body,
    })
  );
});

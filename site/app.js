fetch("apps.json", { cache: "no-store" })           // no-store: always get the current list
  .then((response) => {
    if (!response.ok) throw new Error(response.status);  // e.g. 404 if the file isn't mounted
    return response.json();                         // turn the text into a JavaScript array
  })
  .then((apps) => {
    const list = document.getElementById("apps");
    for (const app of apps) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = app.url;
      link.textContent = app.name;                  // textContent, never innerHTML: the text
      const note = document.createElement("span");  //   can never be run as code
      note.textContent = " — " + app.description;
      item.append(link, note);
      list.append(item);
    }
  })
  .catch(() => {
    document.getElementById("error").hidden = false;  // any failure: show the error line
  });

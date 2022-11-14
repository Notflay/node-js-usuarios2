const btnLog = async () => {
  try {
    const formlogin = document.getElementById("form-login");
    formlogin.onsubmit = async (e) => {
      e.preventDefault();
      const formdata = new FormData(formlogin);
      const data = Object.fromEntries(formdata.entries());
      console.log(formdata);

      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status < 400) {
        const responseData = await response.text();
        localStorage.setItem("jwt", `Bearer ${responseData}`);
        location.reload();
      } else {
        formlogin.reset();
        return alert("The username or password is in incorrect");
      }
    };
  } catch (error) {}
};

const btndelete = async () => {
  try {
    const formlogin = document.getElementById("form-delete");
    formlogin.onsubmit = async (e) => {
      e.preventDefault();
      const id = document.getElementById("acticuloId").value;
      const formdata = new FormData(formlogin);
      const data = Object.fromEntries(formdata.entries());
      console.log(formdata);

      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status < 400) {
        const responseData = await response.text();
        localStorage.setItem("jwt", `Bearer ${responseData}`);

        await fetch(`/deleteCharacter/${id}`, {
          method: "DELETE",
          body: JSON.stringify(data),
        });
        location.reload();
      } else {
        formlogin.reset();
        return alert("The username or password is in incorrect");
      }
    };
  } catch (error) {}
};

try {
  const textErr = document.getElementById("text-error").innerHTML;
  const functi = (tex) => {
    let array = [];
    for (i in tex) {
      array.push(tex[i]);
    }
    for (let i = 0; i < tex.length; i++) {
      if ((tex[i] == ",") | (tex[i] == ":")) {
        array[i] = "<br/>";
      }
    }
    return array.join("");
  };

  const text = functi(textErr);
  document.getElementById("text-error").innerHTML = text;
} catch (error) {}

window.onload = () => {
  btnLog();
  btndelete();
};

/*
const update = async () => {
  try {
    const formUpdate = document.getElementById("form-patch");
    const id = document.getElementById("acticuloId").value;
    formUpdate.onsubmit = async (e) => {
      e.preventDefault();
      const formdata = new FormData(formUpdate);
      const data = Object.fromEntries(formdata.entries());
      console.log(formdata.get("image").name);
      data.image = formdata.get("image").name;

      await fetch(`/editcharacter/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      location.reload();
    };
  } catch (error) {
    console.log(error.message);
  }
};

window.onload = () => {
  update();
};
*/

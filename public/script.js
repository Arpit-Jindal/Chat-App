let socket = io();
$(() => {
  function sendMessage() {
    if ($("#msgbox").val()) {
      socket.emit("send_msg", {
        msg: $("#msgbox").val(),
        username: $("#inpUsername").val(),
        to: $("#inpToUser").val()
      });
    }
    $("#msgbox").val("");
  }
  $("#sendbtn").click(() => {
    sendMessage();
  });
  socket.on("recv_msg", data => {
    if (data.to) {
      $("#msglist").append(`<li> [${data.from}@${data.to}]: ${data.msg}</li>`);
    } else {
      $("#msglist").append(`<li> [${data.from}]: ${data.msg}</li>`);
    }
  });
});

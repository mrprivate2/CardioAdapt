function saveProfile() {
  const mode = document.getElementById("mode").value;
  localStorage.setItem("userMode", mode);
  window.location.href = "dashboard.html";
}

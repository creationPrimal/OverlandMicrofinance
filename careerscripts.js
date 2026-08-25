


/* =========================================
   CAREER POPUP SETTINGS
   ========================================= */

const careersAvailable = true;
const careerPopupEnabled = true;


/* =========================================
   SHOW POPUP AFTER PAGE LOAD
   ========================================= */

window.addEventListener("load", function () {

  if (!careersAvailable || !careerPopupEnabled) {
    return;
  }
  // Don't show again if the visitor already closed it
  if (sessionStorage.getItem("careerPopupClosed") === "true") {
    return;
  }
  setTimeout(function () {
    document.getElementById("careerPopup").classList.add("active");
  }, 800);

});


/* =========================================
   CLOSE POPUP
   ========================================= */

function closeCareerPopup() {

  const popup = document.getElementById("careerPopup");

  popup.classList.remove("active");

  sessionStorage.setItem("careerPopupClosed", "true");
}


/* Close when clicking outside the popup */
document.getElementById("careerPopup").addEventListener("click", function(e) {

  if (e.target === this) {
    closeCareerPopup();
  }

});
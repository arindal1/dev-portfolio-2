

  var tablinks = document.getElementsByClassName("tab-links");
  var tabcontents = document.getElementsByClassName("tab-contents");

  function opentab(tabname) {
    for (tablink of tablinks) {
      tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
      tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
  }

  var sidemenu = document.getElementById("sidemenu");

  function openmenu() {
    sidemenu.style.right = "0";
  }

  function closemenu() {
    sidemenu.style.right = "-200px";
  }

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyC3NCGA9XZlTjEs_oILbzXreVnsreV-aFERpl7JlkmnhF2l9tIYYZOBF0mvkuLHgJT/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML = "Message Sent Succesfully!";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });

  const icons = document.querySelectorAll(".icon");

  icons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      const url = icon.getAttribute("href");
      window.open(url, "_blank");
    });
  });

  // Function to toggle the bubble column when the button is clicked
  function toggleBubbleColumn() {
    const bubbleColumn = document.querySelector(".bubble-column");
    bubbleColumn.classList.toggle("show-icons");
  }

  // Add event listener to the button
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener("click", toggleBubbleColumn);

  const headerText = document.querySelector(".header-text");
  const aboutBg = document.getElementById("about-bg");

  // Function to update opacity and height based on scroll position
  function updateHeaderAndBg() {
    // Get the current scroll position
    const scrollY = window.scrollY;

    // Update the opacity of the "header-text" element
    headerText.style.opacity = 1 - Math.min(scrollY / 400, 1);

    // Update the height of the "about-bg" element
    aboutBg.style.height = Math.min(scrollY / 2, 300) + "px";
  }

  // Call the function on page load
  updateHeaderAndBg();

  // Call the function on scroll
  window.addEventListener("scroll", updateHeaderAndBg);


  const imageWrappers = document.querySelectorAll(".image-wrapper");

  // Add event listeners for each image wrapper
  imageWrappers.forEach((wrapper, index) => {
    wrapper.addEventListener("mouseover", () => {
      // When hovering over an image, set its z-index to a high value
      wrapper.style.zIndex = 1000;
    });

    wrapper.addEventListener("mouseout", () => {
      // When moving the mouse away, set the z-index back to its original value (1)
      wrapper.style.zIndex = 1;
    });
  });

  function openLink(url) {
    window.open(url, "_blank");
  }

  const fixedImages = document.getElementById("fixedImages");

  function handleImageFade() {
    const scrollTop = window.pageYOffset;

    // Calculate the opacity based on the scroll position
    const maxScroll = 200; // Adjust this value to control the fading speed
    const opacity = 1 - Math.min(scrollTop / maxScroll, 1);
    fixedImages.style.opacity = opacity > 0 ? opacity : 0;
  }

  // Initial call to handle the image opacity based on the initial scroll position
  handleImageFade();

  // Add event listener to handle image fading on scroll
  window.addEventListener("scroll", handleImageFade);

  let scrolledPastAmount = false;
  let timeoutId;
  const triggerScrollAmount = 900;

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    if (scrollY > triggerScrollAmount && !scrolledPastAmount) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fixedImages.classList.add("fade-out");
        scrolledPastAmount = true;
      }, 100); // Add a slight delay before applying the fade-out class
    } else if (scrollY <= triggerScrollAmount && scrolledPastAmount) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fixedImages.classList.remove("fade-out");
        scrolledPastAmount = false;
      }, 100); // Add a slight delay before removing the fade-out class
    }
  });

  
  // loading screen

  window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loadingScreen");
    const welcomeText = document.querySelector(".welcome-text");
    const loadingBar = document.getElementById("loadingBar");
    const loadingText = document.getElementById("loadingText");
    const mainContent = document.getElementById("mainContent");
  
    // Function to show main content and hide loading screen
    function showMainContent() {
      loadingScreen.style.opacity = 0;
      setTimeout(function () {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
        setTimeout(function () {
          mainContent.style.opacity = 1;
        }, 10);
      }, 2000);
    }
  
    // Function to update loading bar progress and loading text
    function updateLoadingBar(progress) {
      loadingBar.style.width = progress + "%";
      loadingText.textContent = "Loading... " + progress + "%";
      if (progress === 100) {
        loadingText.textContent = "Loading Complete...";
        setTimeout(function () {
          loadingText.style.opacity = 0;
        }, 2000);
      }
    }
  
    // Loading Animation
    setTimeout(function () {
      welcomeText.style.opacity = 1;
      welcomeText.style.transform = "translateY(0)";
      loadingBar.style.opacity = 1;
      loadingBar.style.transform = "scaleX(1)";
      loadingText.style.opacity = 1;
      loadingText.style.transform = "translateY(0)";
    }, 1000);
  
    let progress = 0;
    const intervalId = setInterval(function () {
      progress++;
      updateLoadingBar(progress);
      if (progress === 100) {
        clearInterval(intervalId);
        setTimeout(showMainContent, 1000);
      }
    }, 20);
  });
  
  //dark mode switch

  const modeToggle = document.getElementById("modeToggle");
const lightModeCSS = document.getElementById("lightModeCSS");

modeToggle.addEventListener("change", function () {
  if (modeToggle.checked) {
    // Dark mode
    lightModeCSS.disabled = true;
  } else {
    // Light mode
    lightModeCSS.disabled = false;
  }
});

const jokeContainer = document.getElementById("joke");
  const btn = document.getElementById("btn3");
  const url =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

  let getJoke = () => {
    jokeContainer.classList.remove("fade");
    fetch(url)
      .then((data) => data.json())
      .then((item) => {
        jokeContainer.textContent = `${item.joke}`;
        jokeContainer.classList.add("fade");
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
      });
  };

  btn.addEventListener("click", getJoke);
  getJoke();